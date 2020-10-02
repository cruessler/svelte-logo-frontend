<script lang="typescript">
  import type { Vm } from "./vm";
  import { mat4, vec3 } from "gl-matrix";

  interface Size {
    width: number;
    height: number;
  }

  export let vm: Vm;
  export let size: Size;

  const getViewBox = ({ width, height }: Size) => {
    return [
      -Math.round(width / 2),
      -Math.round(height / 2),
      width,
      height,
    ].join(" ");
  };

  const getTurtlePoints = ({ x, y, direction }) => {
    const point1 = vec3.fromValues(-15, 0, 0);
    const point2 = vec3.fromValues(15, 0, 0);
    const point3 = vec3.fromValues(0, -30, 0);

    const points = [point1, point2, point3];

    let transform: mat4 = mat4.create();

    mat4.fromTranslation(transform, vec3.fromValues(x, y, 0));
    mat4.rotate(transform, transform, direction, vec3.fromValues(0, 0, 1));
    mat4.translate(transform, transform, vec3.fromValues(0, 1, 0));

    const transformedPoints = points.map((point) =>
      vec3.transformMat4(point, point, transform)
    );

    return transformedPoints.map(([x, y]) => `${x},${y}`).join(" ");
  };
</script>

<style>
  div {
    width: 100%;
    height: 100%;
  }

  #turtle {
    fill: none;
    stroke: black;
  }
</style>

<div>
  <svg viewBox={getViewBox(size)}><polygon
      id="turtle"
      points={getTurtlePoints(vm.environment.turtle)} /></svg>
</div>
