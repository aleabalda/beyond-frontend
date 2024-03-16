import Grid from "../../components/Grid/Grid";
import "./SkyMap.css";
import React, { useEffect, useRef, useState } from "react";
import { getMappedData } from "../../utils/starMapController";

function SkyMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [starData, setStarData] = useState(localStorage.getItem("starData") || "");


  let getConstellations = () => {
    let temp = ["None"] as any[];
    JSON.parse(starData).forEach((star: any) => {
      if (temp.indexOf(star.constellation) === -1) {
        temp.push(star.constellation);
      }
    });
    return temp;
  }
  const [constellations, setConstellations] = useState(getConstellations());


  let redraw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const viewWidth = document.documentElement.clientWidth;
    const viewHeight = document.documentElement.clientHeight;

    // Set actual size in memory (scaled to account for extra pixel density).
    var scale = window.devicePixelRatio; // <--- Change to 1 on retina screens to see blurry canvas.
    canvas.width = viewWidth * scale;
    canvas.height = viewHeight * scale;

    // Normalize coordinate system to use css pixels.
    context.scale(scale, scale);
    

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'white';

    if(starData === "") {
      getMappedData().then((data) => {
        console.log(data);
        localStorage.setItem("starData", JSON.stringify(data));
      });
    }

    let objects = JSON.parse(starData);

    let selectedCon = document.getElementById("selectedCon") as HTMLSelectElement;
    let selected = "";
    try{
      selected = selectedCon.options[selectedCon.selectedIndex].value;
    } catch {
      selected = "";
    }

    objects.forEach((star: any) => {
      
      let temp = constellations
      if (star.constellation) {
        if (temp.indexOf(star.constellation) === -1) {
          temp.push(star.constellation);
          setConstellations(temp);
        }
      }
      context.beginPath();
      if (star.dec < 0) {
        star.dec = star.dec * -1;
        star.dec = star.dec + 90;
      }
      star.dec = (star.dec / 125) * context.canvas.height;

      star.ra = (star.ra / 360) * context.canvas.width;
      let mag = (star.magnitude/ 5);
      if (star.constellation === selected) {
        context.fillStyle = 'yellow';
        mag += 1;
      } else {
        context.fillStyle = 'white';
      }
      context.arc(star.ra, star.dec, mag, 0, 2 * Math.PI);
      context.fill();
    })
    console.log(constellations);
    console.log(selected);
    
  }

  useEffect(() => {
    redraw();
  }, []);

  function openFullscreen() {
    let elem = document.getElementById("skyMap");
    if (!elem) return;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  }


  return (
    <>
      <select id="selectedCon" onChange={redraw}>
        {constellations.map((constellation) => {
          return <option value={constellation}>{constellation}</option>
        })}
      </select>
      <button onClick={ openFullscreen }>Fullscreen</button>
      <canvas id="skyMap" ref={canvasRef}></canvas>
    </>
  );
}

export default SkyMap;
