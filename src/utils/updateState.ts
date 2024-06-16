export const updateState = (
    currState: any,
    field: string,
    inputText: string
) => {
    var sanitizedInputText = inputText;

    if (field == 'chain') {
        sanitizedInputText = sanitizedInputText.replace(/[^a-zA-Z0-9]/g, '');
    } else if (field == 'tokenAddress') {
        sanitizedInputText = sanitizedInputText.replace(/[^a-zA-Z0-9]/g, '');
    } else if (field == 'gradientStart') {
        inputText = inputText.replace('#', '');
        sanitizedInputText = inputText.replace(/[^a-fA-F0-9]/g, '');
        if (sanitizedInputText.length != 6)
            sanitizedInputText = process.env.DEFAULT_GRADIENT_START || '000000';
    } else if (field == 'gradientEnd') {
        inputText = inputText.replace('#', '');
        sanitizedInputText = inputText.replace(/[^a-fA-F0-9]/g, '');
        if (sanitizedInputText.length != 6)
            sanitizedInputText = process.env.DEFAULT_GRADIENT_END || '000000';
    } else {
        sanitizedInputText = inputText === 'true' ? 'true' : 'false';
    }

    const state = currState || {};
    return {
        ...state,
        [field]: sanitizedInputText,
    };
};
