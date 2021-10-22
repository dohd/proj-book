import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const table = {
    header: (header=['']) => header.map(text => ({
        text,
        style: 'tableHeader', 
        bold: true,
        alignment: 'center'
    })),
    data: (data=[], col=1) => {
        return data.reduce((rows, value, index) => {
            if (index % col === 0) rows.push([]);
            rows[rows.length - 1].push({...value, style: 'tableData'});
            return rows;
        }, []);
    },
    body: (...args) => [...args]
};

export default function createPdf(
    header = '', 
    body = [], 
    bodyStyle = {margin: 5 || []},
    pageOrientation,
    headerRows = 1, 
    fillColor = rowIndex => {
        if (rowIndex === 0) return '#0f4871';
        else if (rowIndex % 2 === 0) return '#f2f2f2';
    },
    footer = (currentPage, pageCount) => ({
        text: `Page ${currentPage}`, 
        alignment: 'center'
    })
) {
    // Document definition
    const dd = {
        header: { text: header, alignment: 'center' },
        footer, 
        pageOrientation,
        content: [
            {
                style: 'tableBody',
                table: { headerRows, body },
                layout: { fillColor }
            }
        ],
        styles: {
            tableBody: bodyStyle,
            tableHeader: { margin: 5, color: 'white' },
            tableData: { margin: 5 }
        }
    };
    const title = header.replace(/\s/g, '_');
    pdfMake.createPdf(dd).download(title);
    // pdfMake.createPdf(dd).open();
};
