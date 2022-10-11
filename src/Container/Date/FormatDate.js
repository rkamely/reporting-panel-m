
const FormatDate = (dateValue) => {

    let finalDate = '';
    if (!dateValue)
            return finalDate;
        const inputFormat = 'jYYYY/jM/jD';
        finalDate = dateValue.locale('fa').format(inputFormat);

    return finalDate;
}


export default FormatDate;