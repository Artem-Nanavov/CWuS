const options = {day: 'numeric', month: 'numeric', year: '2-digit'};
const dateFormatter = (date: Date | string): string => new Date(date).toLocaleDateString('nu-ca', options);

export default dateFormatter;
