import beeper from "../Assets/dots/Beeper.png";
import capasitor100 from "../Assets/dots/Capacitor 1.png";
import capasitor1000 from "../Assets/dots/Capacitor 2.png";
import diode from "../Assets/dots/Diode.png";
import dip from "../Assets/dots/DIP.png";
import junction from "../Assets/dots/Junction.png";
import ldr from "../Assets/dots/LDR.png";
import led from "../Assets/dots/LED.png";
import pot from "../Assets/dots/Potentiometer.png";
import power from "../Assets/dots/Power.png";
import res_100 from "../Assets/dots/Resistor 1.png";
import res_250 from "../Assets/dots/Resistor 2.png";
import tact from "../Assets/dots/tact.png";
import timer from "../Assets/dots/Timer IC.png";
import transistor from "../Assets/dots/Transistor.png";
import two_way_switch from "../Assets/dots/two way switch.png";

function renderImage(imageName) {
  switch (imageName) {
    case "beeper":
      return beeper;
    case "capasitor100":
      return capasitor100;
    case "capasitor1000":
      return capasitor1000;
    case "diode":
      return diode;
    case "dip":
      return dip;
    case "junction":
      return junction;
    case "ldr":
      return ldr;
    case "pot":
      return pot;
    case "power":
      return power;
    case "res_100":
      return res_100;
    case "res_250":
      return res_250;
    case "tact":
      return tact;
    case "timer":
      return timer;
    case "transistor":
      return transistor;
    case "two_way_switch":
      return two_way_switch;
    case "led":
      return led;
  }
}
export default renderImage;
