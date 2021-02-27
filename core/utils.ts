export const parseCSV = (csv: string) => {
    const lines = csv.split(/\r\n|\n|\r/);

    // console.log(lines[0].split(','));
    // console.log(lines[1].split(','));

    return csv;
}