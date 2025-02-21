import { useState } from 'react';
import styles from './App.module.css';

function App() {
  const NUMS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '', '0', ''];
  const OPERATORS = ['+', '-', '=', 'C'];

  const [operand1, setOperand1] = useState('');
  const [operator, setOperator] = useState('');
  const [operand2, setOperand2] = useState('');
  const [resultColor, setResultColor] = useState(false);

  const handleNumberClick = (num) => {
    if (!operator) {
      setOperand1(operand1 === '' && num === '0' ? '' : operand1 + num);
    } else {
      setOperand2(operand2 === '' && num === '0' ? '' : operand2 + num);
    }
  };

  const handleOperatorClick = (op) => {
    if (op === 'C') {
      setOperand1('');
      setOperator('');
      setOperand2('');
      setResultColor(false);
    } else if (op === '=') {
      calculateResult();
    } else {
      setOperator(op);
      setResultColor(false);
    }
  };

  const calculateResult = () => {
    let num1 = parseInt(operand1);
    let num2 = parseInt(operand2);

    if (isNaN(num1) || isNaN(num2)) {
      return;
    }

    let result;
    switch (operator) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      default:
        return;
    }

    setOperand1(result.toString());
    setOperator('');
    setOperand2('');
    setResultColor(true);
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.calculator}>
        <div className={styles.display} style={{ color: resultColor ? '#2ecc71' : '#3498db' }}>
          {operand1} {operator} {operand2}
        </div>
        <div className={styles.numbers}>
          {NUMS.map((button, index) => (
            <button
              key={index}
              className={styles.button}
              onClick={() => {
                if (button !== '') {
                  handleNumberClick(button);
                }
              }}
              style={{ visibility: button === '' ? 'hidden' : 'visible' }}
            >
              {button}
            </button>
          ))}
        </div>
        <div className={styles.operators}>
          {OPERATORS.map((button, index) => (
            <button
              key={index}
              className={`${styles.button} ${styles.operatorButton}`}
              onClick={() => handleOperatorClick(button)}
            >
              {button}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
