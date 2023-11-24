import { useViewportSize } from "@mantine/hooks";
import axios from "axios";
import Phaser from "phaser";
import React, { useEffect, useRef, useState } from "react";

// Definišite Phaser scenu
class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
    this.graphData = [];
    this.graphPoints = [];
    this.maxPoints = 30;
    this.currentNumber = 0;
    this.valueTexts = [];
    this.currentTime = 0;
  }

  init(data) {
    this.graphData = data;
    this.time.addEvent({
      delay: 200, // Vreme u milisekundama između dodavanja tačaka
      callback: this.addPoint,
      callbackScope: this,
      loop: true,
    });
  }

  create() {
    this.graphics = this.add.graphics({
      lineStyle: { width: 2, color: 0xffffff },
    });
  }

  update(time, delta) {
    // Ažurirajte grafikon ako je potrebno
    this.updateGraph();
    this.currentTime += delta / 1000;
  }
  createGraph() {
    const graphics = this.add.graphics({
      lineStyle: { width: 2, color: 0xffffff },
    });
    const maxValue = Math.max(...this.graphData);
    const minValue = Math.min(...this.graphData); // Dodajte minimalnu vrednost
    const range = maxValue - minValue; // Opseg između max i min vrednosti
    const stepX = 50;
    const padding = 10;

    let prevX = 0;
    let prevY =
      this.scale.height -
      ((this.graphData[0] - minValue) / range) * this.scale.height;

    // Postepeno iscrtavanje
    let currentIndex = 0;
    this.time.addEvent({
      delay: 200, // Kontrolišite brzinu iscrtavanja
      callback: () => {
        if (currentIndex < this.graphData.length) {
          const value = this.graphData[currentIndex];
          const x = stepX * currentIndex;
          const y =
            this.scale.height -
            ((value - minValue) / range) * this.scale.height;

          graphics.lineBetween(prevX, prevY, x, y);
          this.add
            .text(x, y - padding, `${value.toFixed(2)}`, {
              font: "18px Arial",
              fill: "#ffffff",
            })
            .setOrigin(0.5, 1);

          prevX = x;
          prevY = y;
          currentIndex++;
        }
      },
      repeat: this.graphData.length - 1,
    });
  }
  addPoint() {
    if (this.graphData.length > 0) {
      const newValue = this.graphData.shift(); // Uzmite sledeću vrednost
      this.graphPoints.push(newValue); // Dodajte je na kraj niza tačaka

      if (this.graphPoints.length > this.maxPoints) {
        // Ako pređemo max broj tačaka, počnite da uklanjate sa početka
        this.graphPoints.shift();
      }

      this.updateGraph(); // Ažurirajte iscrtavanje grafikona
    }
  }
  updateGraph() {
    this.graphics.clear();
    const maxValue = Math.max(...this.graphPoints) + 0.5;
    const minValue = Math.min(...this.graphPoints) - 0.5;
    const range = maxValue - minValue;
    this.valueTexts.forEach((text) => text.destroy());
    this.valueTexts = [];
    this.timeTexts?.forEach((text) => text.destroy());
    this.timeTexts = [];

    // Početne pozicije su pomerene udesno i nagore
    const startX = 100;
    const startY = this.scale.height - 100;
    const stepX = (this.scale.width - startX) / this.maxPoints;

    const timeLabels = 6;
    let timeOffset = Math.max(this.currentTime - 6, 0);

    for (let i = 0; i <= timeLabels; i++) {
      const x = startX + ((stepX * (this.maxPoints - 1)) / timeLabels) * i;
      this.graphics.lineStyle(1, 0xa5a5ac);

      this.graphics.lineBetween(x, startY + 20, x, startY + 10);

      let label = (timeOffset + i).toFixed(0) + "s";
      const text = this.add
        .text(x, startY + 30, label, {
          font: "12px Arial",
          fill: "#373D3F",
        })
        .setOrigin(0.5, 0);
      this.timeTexts.push(text); // Sačuvajte referencu na tekstualni objekat
    }

    // Dodajte horizontalnu liniju na vrhu podeoka
    this.graphics.lineStyle(1, 0xa5a5ac);
    this.graphics.lineBetween(
      startX,
      startY + 10,
      startX + stepX * (this.maxPoints - 1),
      startY + 10
    );

    // Iscrtavanje podeoka skale vrednosti
    const valueLabels = 5;
    const stepY = (startY - 50) / (valueLabels - 1);
    for (let i = 0; i < valueLabels; i++) {
      const value = minValue + (range / (valueLabels - 1)) * i;
      const y = startY - stepY * i;
      //   this.graphics.lineBetween(startX - 10, y, startX, y);

      // Dodajte tekstualni objekat i sačuvajte referencu
      const text = this.add
        .text(startX - 20, y, `${value.toFixed(2)}x`, {
          font: "12px Arial",
          fill: "#373D3F",
        })
        .setOrigin(1, 0.5);
      this.valueTexts.push(text);
    }

    // Iscrtavanje grafikona
    const interpolateColor = (color1, color2, factor) => {
    //   if (arguments.length < 3) {
    //     factor = 0.5;
    //   }
      const result = color1.slice();
      for (let i = 0; i < 3; i++) {
        result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
      }
    //   console.log(result);
    //   console.log(factor);
      return result;
    };

    // Definisanje boja
    const red = [255, 0, 60]; // FF003C
    const blue = [1, 249, 227]; // 01F9E3
    let prevX = startX;
    let prevY = startY;
    this.graphPoints.forEach((value, index) => {
      const x = startX + stepX * index;
      const y = startY - ((value - minValue) / range) * (startY - 50);

      if (index > 0) {
        // Izračunajte faktor na osnovu promene vrednosti
        let factor = 0; // Ovo možete prilagoditi da zavisi od promene vrednosti
        if (value < this.graphPoints[index - 1]) {
          factor = 0; // više crvene boje ako vrednost pada
        } else {
          factor = 1; // više plave boje ako vrednost raste
        }

        const color = interpolateColor(red, blue, factor);
        this.graphics.lineStyle(
          2,
          Phaser.Display.Color.GetColor(color[0], color[1], color[2])
        );
        this.graphics.lineBetween(prevX, prevY, x, y);
      }

      prevX = x;
      prevY = y;
    });
    // Kreiranje gradijentne teksture
    let graphics = this.add.graphics();

    // Dodavanje boja u gradijent
    graphics.fillGradientStyle(0xff003c, 0xff003c, 0x01f9e3, 0x01f9e3, 1);

    // Primena gradijenta kao "bojenja" za pravougaonik
    graphics.fillRect(0, 0, 600, 600);

    // Generisanje teksture iz grafike
    graphics.generateTexture("gradientTexture", 600, 600);
    graphics.clear(); // Očisti grafiku ako više nije potrebna

    // Korišćenje gradijentne teksture za crtanje linija
    //     let prevX = startX;
    // let prevY = startY;
    this.graphPoints.forEach((value, index) => {
      if (index > 0) {
        const x = startX + stepX * index;
        const y = startY - ((value - minValue) / range) * (startY - 50);

        // Crtanje segmenta linije koristeći gradijentnu teksturu
        let line = this.add.image(
          prevX + (x - prevX) / 2,
          prevY + (y - prevY) / 2,
          "gradientTexture"
        );
        line.setDisplaySize(x - prevX, 2); // Podesiti širinu i visinu linije
        line.angle = Phaser.Math.RadToDeg(Math.atan2(y - prevY, x - prevX)); // Rotirati liniju

        // Ažuriranje prethodnih koordinata
        prevX = x;
        prevY = y;
      }
    });
  }
}

// Phaser igra unutar React komponente
const PhaserGame = ({ isLandScape }) => {
  const { width, height } = useViewportSize();
  const [fetchedData, setFetchedData] = useState([1]);
  const gameRef = useRef(null);

  const apiUrl = "http://157.230.107.88:8001/crypto-run";

  // Fetch podataka
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(apiUrl);
        if (res.data && res.data.length >= 2) {
          setFetchedData(res.data); // Pretpostavljam da je format { x: number, y: number }
        }
      } catch (error) {
        console.error("Došlo je do greške pri dohvatanju podataka", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Inicijalizacija igre treba da se desi samo jednom
    if (fetchedData.length > 0 && !gameRef.current) {
      const canvasWidth = isLandScape ? width / 1.28 : width / 1.1;
      const canvasHeight = isLandScape ? height / 1.6 : height / 2.5;
      const config = {
        type: Phaser.AUTO,
        parent: "phaser-container",
        width: canvasWidth,
        height: canvasHeight,
        scene: new MainScene(),
        physics: { default: "arcade" },
        backgroundColor: "#12101e",
      };

      gameRef.current = new Phaser.Game(config);
      gameRef.current.scene.start("MainScene", fetchedData);
    }

    // Očistite igru kada komponenta bude demontirana
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [fetchedData, width, height, isLandScape]); // Ponovo pokrenite ovaj efekat kada se promeni fetchedData ili dimenzije prozora

  return <div id="phaser-container" />;
};

export default PhaserGame;
