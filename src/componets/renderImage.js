import beeper from "../Assets/beeper.png";
import capasitor100 from "../Assets/capasitor100.png";
import capasitor1000 from "../Assets/capasitor1000.png";
import diode from "../Assets/diode.png";
import dip from "../Assets/dip.png";
import junction from "../Assets/junction.png";
import ldr from "../Assets/ldr.png";
import led from "../Assets/led.png";
import pot from "../Assets/pot.png";
import power from "../Assets/Power.png";
import res_100 from "../Assets/res_100_ohm.png";
import res_250 from "../Assets/res_250_ohm.png";
import tact from "../Assets/tact.png";
import timer from "../Assets/timer_ic.png";
import transistor from "../Assets/transistor.png";
import two_way_switch from "../Assets/two_way_switch.png";

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
