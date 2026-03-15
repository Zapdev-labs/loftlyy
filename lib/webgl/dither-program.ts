import { VERTEX_SOURCE, FRAGMENT_SOURCE } from "./shaders"

export interface DitherProgram {
  program: WebGLProgram
  vao: WebGLVertexArrayObject
  uniforms: {
    texFrom: WebGLUniformLocation
    texTo: WebGLUniformLocation
    progress: WebGLUniformLocation
    ditherScale: WebGLUniformLocation
  }
}

function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string
): WebGLShader {
  const shader = gl.createShader(type)
  if (!shader) throw new Error("Failed to create shader")
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    throw new Error(`Shader compile error: ${info}`)
  }
  return shader
}

export function createDitherProgram(gl: WebGL2RenderingContext): DitherProgram {
  const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SOURCE)
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SOURCE)

  const program = gl.createProgram()
  if (!program) throw new Error("Failed to create program")
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program)
    gl.deleteProgram(program)
    throw new Error(`Program link error: ${info}`)
  }

  gl.deleteShader(vs)
  gl.deleteShader(fs)

  // Fullscreen quad: two triangles covering [-1, 1]
  const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1])

  const vao = gl.createVertexArray()
  if (!vao) throw new Error("Failed to create VAO")
  gl.bindVertexArray(vao)

  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

  const posLoc = gl.getAttribLocation(program, "a_position")
  gl.enableVertexAttribArray(posLoc)
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

  gl.bindVertexArray(null)

  const getUniform = (name: string) => {
    const loc = gl.getUniformLocation(program, name)
    if (!loc) throw new Error(`Uniform ${name} not found`)
    return loc
  }

  return {
    program,
    vao,
    uniforms: {
      texFrom: getUniform("u_texFrom"),
      texTo: getUniform("u_texTo"),
      progress: getUniform("u_progress"),
      ditherScale: getUniform("u_ditherScale"),
    },
  }
}

export function loadTexture(
  gl: WebGL2RenderingContext,
  source: HTMLImageElement | HTMLCanvasElement
): WebGLTexture {
  const tex = gl.createTexture()
  if (!tex) throw new Error("Failed to create texture")
  gl.bindTexture(gl.TEXTURE_2D, tex)
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source)
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  return tex
}

export function draw(
  gl: WebGL2RenderingContext,
  prog: DitherProgram,
  texFrom: WebGLTexture,
  texTo: WebGLTexture,
  progress: number,
  ditherScale: number
): void {
  gl.useProgram(prog.program)

  gl.activeTexture(gl.TEXTURE0)
  gl.bindTexture(gl.TEXTURE_2D, texFrom)
  gl.uniform1i(prog.uniforms.texFrom, 0)

  gl.activeTexture(gl.TEXTURE1)
  gl.bindTexture(gl.TEXTURE_2D, texTo)
  gl.uniform1i(prog.uniforms.texTo, 1)

  gl.uniform1f(prog.uniforms.progress, progress)
  gl.uniform1f(prog.uniforms.ditherScale, ditherScale)

  gl.bindVertexArray(prog.vao)
  gl.drawArrays(gl.TRIANGLES, 0, 6)
  gl.bindVertexArray(null)
}

export function dispose(gl: WebGL2RenderingContext, prog: DitherProgram): void {
  gl.deleteProgram(prog.program)
  gl.deleteVertexArray(prog.vao)
}
