import React, { useEffect, useRef, useState } from 'react'
import axios from "axios";

const App = () => {
    const [questions,setQuestions] = useState(null);
    const [currentIndex,setCurrentIndex] = useState(0);
    const input = useRef([]);

    useEffect(() => {
        axios("https://the-trivia-api.com/v2/questions")
        .then((res)=> {
          console.log(res.data);
           setQuestions(res.data);
        })
        .catch((e)=>{
           console.log(e);
        })  
    },[])

    const nextQuestion = () => {
      const selectedOptions = input.current.find(item => item && item.checked);
      console.log(selectedOptions.value);
      if(currentIndex < questions.length - 1){
        setCurrentIndex(currentIndex + 1);
      }
      else{
        console.log("No more questions");
      }
    }
    
    const arrangeRandom = (arr) =>{
       const emptyArray = [];
       const arrangeArray = [];
       for(let i = 0; i < arr.length;i++){
        const randomNumber = Math.floor(Math.random () * arr.length );
        if(emptyArray.includes(randomNumber)){
          i--
        }
        else{
          emptyArray.push(randomNumber);
          arrangeArray[randomNumber] = arr[i];
        }
       }
       return arrangeArray;
    } 

      return (
    <>
       <h1>Quiz App</h1>
       {questions ?
          <> 
             <p>Q{currentIndex + 1}: {questions[currentIndex].question.text}</p> 
             {arrangeRandom([... questions[currentIndex].incorrectAnswers, questions[currentIndex].correctAnswer
                ]).map((item,index) => {
               return <div key={`option${index}`}>
                        <input type="radio" name="question" id={index} value={item} ref={el => input.current[index] = el} />
                        <label htmlFor={index}>{item}</label>
               </div>
             })}
             <button onClick={nextQuestion}>Next</button>
          </> 
       : "Loading ..."}
    </>
  )
}

export default App