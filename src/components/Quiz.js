import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import GameOver from './GameOver';

const QuizWindow = styled.div`
    text-align: center;
    margin: 5em auto;
    font-size: clamp(20px, 2.5vw, 24px);
`;

const Options = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 2em auto;
`;

const Option = styled.button`
    display: block;
    border: 1px solid #616A94;
    border-radius: 50px;
    padding: 15px 30px;
    text-decoration: none;
    color: #616A94;
    background-color: #161A31;
    transition: 0.3s;
    font-size: 1em;
    cursor: pointer;
    outline: none;
    margin-top: 1em;

    &:hover {
        color: white;
        background-color: #616A94;
    }
`;

const Question = styled.div`
    width: 70%;
    margin: 0 auto;
`;

const Quiz = () => {

    const [quiz, setQuiz] = useState([]);
    const [number, setNumber] = useState(0);
    const [pts, setPts] = useState(0);

    const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

    const pickAnswer = (e) => {

        let userAnswer = e.target.outerText;

        if (quiz[number].answer === userAnswer) setPts(pts+1);
        setNumber(number+1);
    }

    useEffect(() => {

        axios.get('https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple')
            .then(res => {
                setQuiz(res.data.results.map(item => (

                    {
                        question: item.question,
                        options: shuffle([...item.incorrect_answers, item.correct_answer]),
                        answer: item.correct_answer
                    }

                )));
            })
            .catch(err => console.error(err))

    }, []);


    return (
        <QuizWindow>
            { quiz[number] && 
            
            <>
                <Question dangerouslySetInnerHTML={{__html: quiz[number].question}}></Question>

                <Options>
                    {quiz[number].options.map((item, index) => (
                        <Option onClick={pickAnswer} dangerouslySetInnerHTML={{__html: item}} key={index}></Option>
                    ))}
                </Options>
            </>

            }
            {
                number === 5 && <GameOver pts={pts} />
            }
        </QuizWindow>
    )
}

export default Quiz
