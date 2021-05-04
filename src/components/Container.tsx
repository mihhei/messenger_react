import React, { useState } from 'react';
import { InputField } from './InputField';
import { DiffButton } from './DiffButton';
import parse from 'html-react-parser';

export const Container: React.FC = () => {
  const [flip, setFlip] = useState<string>('');
  const [oldText, setOldText] = useState<string>('');
  const [newText, setNewText] = useState<string>('');
  const [diff, setDiff] = useState<string>('');

  const showDiff = (): void => {
    setFlip('flip');
    const textX = oldText.split('.');
    const textY = newText.split('.');
    textX.map((item, index)=>{
        
        const x: any = ('0 ' + item).split(' ');
        const y: any = ('0 ' + textY[index]).split(' ');
        const XY: any = {};
        for (let i = 0; i < x.length; i++) {
          XY[i] = [0];
          for (let n = 1; n < y.length; n++) {
            if (i === 0) {
              XY[i].push(0);
            } else {
              if (x[i] === y[n]) {
                XY[i].push(XY[i - 1][n - 1] + 1);
              } else {
                XY[i].push(Math.max(XY[i][n - 1], XY[i - 1][n]));
              }
            }
          }
        }
    
        const getDiff = (
          XY: any,
          x: string,
          y: string,
          i: number,
          n: number,
          itemTemplate: string
        ): void => {
          if (n >= 1 && i >= 1 && x[i] === y[n]) {
            itemTemplate = ' '+ x[i] + itemTemplate;
            i -= 1;
            n -= 1;
            getDiff(XY, x, y, i, n, itemTemplate);
          } else {
            if (n > 1 && (i === 1 || XY[i][n - 1] >= XY[i - 1][n])) {
              itemTemplate = ' <span id="green">++' + y[n] + '</span>' + itemTemplate;
              n -= 1;
              getDiff(XY, x, y, i, n, itemTemplate);
            } else {
              if (i > 1 && (n === 1 || XY[i][n - 1] < XY[i - 1][n])) {
                itemTemplate = ' <span id="red">--' + x[i] + '</span>' + itemTemplate;
                i -= 1;
                getDiff(XY, x, y, i, n, itemTemplate);
              } else {
               setDiff(prev => prev + '<div>' + itemTemplate);
              }
            }
          }
        };
        let i = x.length - 1;
        let n = y.length - 1;
        let itemTemplate = '</div>';
        
        getDiff(XY, x, y, i, n, itemTemplate);
      
    })
};

  const getText = (tag: string, text: string) => {
    if (tag === 'old') {
      setOldText(text);
    } else {
      setNewText(text);
    }
  };

  return (
    <div className="container">
      <div className="block1">
        <InputField tag="old" getText={getText} value={oldText} />
      </div>
      <div className="block2">
        <div className={'flip-container ' + flip}>
          <div className="flipper">
            <div className="front">
              <DiffButton showDiff={showDiff} />
            </div>
            <div className="back">
              <div className="result">{parse(diff)}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="block1">
        <InputField tag="new" getText={getText} value={newText} />
      </div>
    </div>
  );
};
