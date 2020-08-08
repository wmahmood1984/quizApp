import React from 'react'
import {Wrapper, ButtonWrapper } from './QuestionCArd.Styles'
type Props = {
    question: string;
    answers: string[];
    callback: any;
    userAnswer: any;
    questionNum: number;
    totalQuestion: number;
}


export const QuestionCard: React.FC<Props> = ({question, answers,callback,userAnswer,questionNum,totalQuestion}) => {
    return (
        <Wrapper>
            <p>
            Question : {questionNum} / {totalQuestion}
            </p>
            <p dangerouslySetInnerHTML={ {__html:question}}></p>
            <div>
                {answers.map(answer=>(
                    <div>
                        <ButtonWrapper
                        correct = {userAnswer?.correctAnswer ===answer}
                        userClicked = {userAnswer?.answer === answer}
                        >
                        <button disabled={userAnswer} value={answer}onClick={callback}>
                            <span dangerouslySetInnerHTML={{__html:answer}}>

                            </span>
                        </button>
                        </ButtonWrapper>
                    </div>
                ))}
            </div>
        </Wrapper>
    )
}
