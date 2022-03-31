import { Params } from "./pane";

export const shaders = (params: Params) => ({
  vertex: `        
    precision highp float;

    attribute vec2 a_pos;
    uniform vec2 u_res;
    uniform float u_zoom;
    uniform vec2 u_center;
    varying vec2 v_pos;
    
    void main() {
      gl_Position = vec4(a_pos, 0, 1);
      v_pos = (1.0 / u_zoom) * a_pos + u_center;
      v_pos.x *= u_res.x / u_res.y;
    }
  `,
  fragment: `
    precision highp float;

    #define MAX_ITERS ${params.maxIterations}
    #define DELTA_T ${params.deltaT}
    #define PLANETS_COUNT ${params.planets.length}
    #define BALL_MASS 100.0

    varying vec2 v_pos;
    uniform vec2 u_planet_positions[PLANETS_COUNT];
    uniform float u_planet_radii[PLANETS_COUNT];
    uniform float u_planet_masses[PLANETS_COUNT];
    uniform vec3 u_planet_colors[PLANETS_COUNT];

    float distance_sq(vec2 u, vec2 v) {
      float diffx = v.x - u.x;
      float diffy = v.y - u.y;
      return diffx * diffx + diffy * diffy;
    }

    vec2 gravity_force(vec2 ball_pos, vec2 planet_pos, float planet_mass) {
      vec2 dir = planet_pos - ball_pos;
      float dist_sq = dot(dir, dir);
      float len = 0.0000001 * ((BALL_MASS * planet_mass) / dist_sq);
      return len * normalize(dir);
    }

    vec2 compute_acceleration(vec2 ball_pos) {
      vec2 acceleration = vec2(0.0);

      for (int i = 0; i < PLANETS_COUNT; i++) {
        vec2 planet_pos = u_planet_positions[i];
        float planet_mass = u_planet_masses[i];
        vec2 force = gravity_force(ball_pos, planet_pos, planet_mass);
        acceleration += force / BALL_MASS;
      }

      return acceleration;
    }

    vec3 compute_trajectory() {
      vec2 position = vec2(v_pos);
      vec2 velocity = vec2(0.0);

      for (int i = 0; i < MAX_ITERS; i++) {
        for (int j = 0; j < PLANETS_COUNT; j++) {
          vec2 planet_pos = u_planet_positions[j];
          float planet_radius = u_planet_radii[j];
          if (distance_sq(position, planet_pos) < planet_radius * planet_radius) {
            vec3 planet_color = u_planet_colors[j];
            return mix(planet_color, vec3(0.0), float(i) / float(MAX_ITERS));
          }
        }

        vec2 acceleration = compute_acceleration(position);
        velocity += acceleration * DELTA_T;
        position += velocity * DELTA_T;
      }

      return vec3(0.0);
    }

    void main() {
      vec3 color = compute_trajectory();
      gl_FragColor = vec4(color, 1.0);
    }
  `
});