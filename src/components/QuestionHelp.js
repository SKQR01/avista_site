import React from 'react'
import {FaQuestionCircle} from "react-icons/fa"
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger  from "react-bootstrap/OverlayTrigger";

const QuestionHelp = ({message}) => {
  return (
    <div>
        <OverlayTrigger overlay={<Tooltip>{message}</Tooltip>}>
            <FaQuestionCircle/>
        </OverlayTrigger>

    </div>
  )
}

export default QuestionHelp