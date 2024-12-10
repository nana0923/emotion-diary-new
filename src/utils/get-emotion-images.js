import emotion1 from "@/assets/1.Joy.svg";
import emotion2 from "@/assets/2.Happiness.svg";
import emotion3 from "@/assets/3.Proud.svg";
import emotion4 from "@/assets/4.Tired.svg";
import emotion5 from "@/assets/5.Sadness.svg";
import emotion6 from "@/assets/6.Angry.svg";
import emotion7 from "@/assets/7.Anxiety.svg";
import emotion8 from "@/assets/8.Depression.svg";
import emotion9 from "@/assets/9.Serenity.svg";

export function getEmotionImage(emotionId) {
  switch (emotionId) {
    case 1:
      return emotion1;
    case 2:
      return emotion2;
    case 3:
      return emotion3;
    case 4:
      return emotion4;
    case 5:
      return emotion5;
    case 6:
      return emotion6;
    case 7:
      return emotion7;
    case 8:
      return emotion8;
    case 9:
      return emotion9;
    default:
      return null;
  }
}
