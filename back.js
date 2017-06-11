
          for(var i = 0; i < 3; i++)
        {
          if(surface_color[i]>1)
            surface_color[i]=1;
          if(surface_color[i]<0)
            surface_color[i]=0;
        }

        // REFLECTED RAY
        /*
        var color_remaining_update = mult_3_coeffs(color_remaining, subtract(Color(1,1,1,1).slice(0,3),surface_color));
        var color_remaining_reflect = scale_vec(closest_intersection.ball.k_r, color_remaining_update);
        var color_remaining_refract = scale_vec(closest_intersection.ball.k_refract, color_remaining_update);
        var L = scale_vec(-1, normalize(ray.dir.slice(0,3)));
        var R = normalize(subtract(scale_vec(2*dot(N,L),N),L)); 
        //get reflect color from relected ray
        var reflect_ray = { origin: intersection_pt, dir: R.concat(0) };
        var reflect_color = scale_vec(closest_intersection.ball.k_r,this.trace(reflect_ray,color_remaining_reflect,false).slice(0,3)) ;
        */
        // L = scale_vec(-1, normalize(ray.dir.slice(0,3)));
        // var reflect_dir = normalize(subtract(scale_vec(2*dot(N,L),N),L));
        // var reflected_ray = vec4(reflect_dir[0], reflect_dir[1], reflect_dir[2], 0);
        // var reflected_ray = { origin: intersection_pt, dir: reflect_dir};
        // var color_reflected = subtract(vec3(1, 1, 1), surface_color);

        // var complement_alpha = subtract(vec3(1, 1, 1) , surface_color); 
        // var color_remain = mult_3_coeffs(complement_alpha, scale_vec(1/ball.k_r, color_remaining) );
        // var temp1 = this.trace(reflected_ray, color_remain, false, 0).slice(0, 3);
        // temp1= scale_vec(ball.k_r, temp1);
        // color_reflected = mult(color_reflected, temp1);
        // color_reflected = vec4(color_reflected[0], color_reflected[1], color_reflected[2], 1); 
        //console.log(color_remain);

        // REFRACTED RAY
        // var refract_dir = 
        // var refract_ray = {origin: intersection_pt, dir:refract_dir}
        // var color_refract = subtract(vec3(0, 0, 0), surface_color);  
        // var temp2 = this.trace(refract_ray, scale_vec(1/ball.k_refract, color_remaining), false).slice(0,3);
        // temp1 = mult(temp1, temp2); 
        // var pixel_color = add(surface_color, temp1);
        // temp1 = mult(ball.k_refract, this.trace().slice(0,3)); 
        // pixel_color = add(pixel_color, temp1);

          var color_remaining_update = mult_3_coeffs(color_remaining, subtract(Color(1,1,1,1).slice(0,3),surface_color));
          var color_remaining_reflect = scale_vec(closest_intersection.ball.k_r, color_remaining_update);
          var color_remaining_refract = scale_vec(closest_intersection.ball.k_refract, color_remaining_update);
          var L = scale_vec(-1, normalize(ray.dir.slice(0,3)));
          var R = normalize(subtract(scale_vec(2*dot(N,L),N),L)); 
          //get reflect color from relected ray
          var reflect_ray = { origin: intersection_pt, dir: R.concat(0) };
          var reflect_color = scale_vec(closest_intersection.ball.k_r,this.trace(reflect_ray,color_remaining_reflect,false, false).slice(0,3)) ;
          //get refract color from refracted ray
          var r = closest_intersection.ball.refract_index;
          L = normalize(ray.dir.slice(0,3));
          var c = dot(scale_vec(-1,N),L);
          var refract_ray1 = scale_vec(r,L);
          var refract_ray2 = scale_vec(r*c-Math.sqrt(1-Math.pow(r,2)*(1-Math.pow(c,2))),N);
          var refract_ray3 = normalize(add(refract_ray1,refract_ray2));
          var refract_ray = { origin: intersection_pt, dir: refract_ray3.concat(0) };
          var refract_color = scale_vec(closest_intersection.ball.k_refract,this.trace(refract_ray,color_remaining_refract,false).slice(0,3)) ;
          //add colors and return
          var pixel_color = add(surface_color,mult_3_coeffs(subtract(Color(1,1,1,1).slice(0,3),surface_color),add(reflect_color,refract_color)));
          return pixel_color.concat(1);