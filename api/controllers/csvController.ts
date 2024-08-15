import type { Context } from "hono";
import { parseFile } from "@fast-csv/parse";
import csvService from "../services/csvService";

async function saveCsvToDB(c: Context) {

    // TODO: Write checks to ensure the 't' query parameter is according to file uploaded

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const file = (c.req as any).file;
    const dataType = c.req.query('t');

    if (!dataType) {
        return c.json({
            status: "ERROR",
            message: 'Data type not specified'
        }, 400);
    }
    else if (dataType !== 'po' && dataType !== 'rr' && dataType !== 'da') {
        return c.json({
            status: "ERROR",
            message: 'Invalid data type specified'
        }, 400);
    }

    if (!file) {
        return c.text('No file uploaded', 400);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parsedData: any[] = [];
    try {
        await new Promise((resolve) => {
            parseFile(file.path, { headers: true })
                .on("data", (row) => {
                    // Prepare data for further processing
                    // Make sure the keys are in lowercase
                    Object.keys(row).forEach((key) => {
                        if (key !== key.toLowerCase()) {
                            row[key.toLowerCase()] = row[key];
                            delete row[key];
                        }
                    });
                    parsedData.push(row);
                })
                .on("error", (error) => {
                    console.error(error);
                    return c.json(
                        {
                            status: "ERROR",
                            message: "An error occurred while parsing the CSV file."
                        });
                })
                .on("end", async () => {
                    // Save data to database
                    let serviceResponse = { status: 'ERROR' };

                    if (dataType === 'po') {
                        serviceResponse = await csvService.upsertPoData(parsedData);
                    } else if (dataType === 'rr') {
                        serviceResponse = await csvService.upsertRrData(parsedData);
                    } else if (dataType === 'da') {
                        serviceResponse = await csvService.upsertDaData(parsedData);
                    } else {
                        return c.json({
                            status: "ERROR",
                            message: "Invalid data type specified"
                        }, 400);
                    }

                    resolve(serviceResponse.status);
                });
        })

    }
    catch (err) {
        console.error(err);
        const response = {
            status: "ERROR",
            statusCode: 500,
            message: "An error occurred while saving the data."
        };
        return c.json(response);
    }

    return c.json({
        status: 200,
        message: 'File uploaded successfully',
        data: {
            filename: file.filename,
            data: {
                rows: parsedData
            }
        }
    })
}

export default { saveCsvToDB };