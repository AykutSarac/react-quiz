import React from 'react'
import styled, { css } from 'styled-components/macro'
import Button from './Button';

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10em auto;
  width: fit-content;
`;

const btnCSS = css`
    margin-top: 2em;
`;


const Start = ({props}) => {

    const startQuiz = () => props(true)
 
    return (
        <Intro>
            <h1>Take the quiz.</h1>
            <h4>Whenever, you want.</h4>
            <Button onClick={startQuiz} css={btnCSS}>Begin</Button>
        </Intro>
    )
}

export default Start
