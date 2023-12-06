import React, { useEffect, useState } from 'react';

const FormQuestion = ({edit, question}) => {
    const question_type_display = {
        "Long Answer": 1,
        "Dropdown": 2,
        "Radio": 3,
        "Checkbox": 4,
        "File": 5
    }

    return (<p>{JSON.stringify(question)}</p>)
}

export default FormQuestion