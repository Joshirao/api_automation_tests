import {expect} from 'chai';
import {agent as request} from 'supertest';
import {getTestData} from "../../testdata/TestData.data";

const testData = getTestData();
describe('Testing the single article endpoint', () => {
    it('Successfully perform the GET request on the single article endpoint', async function () {
        const apiResponse = await request(testData.url)
            .get('/articles/2');
        expect(apiResponse.status).to.equal(200);
        expect(apiResponse.body).has.all.keys(
             'id', 'createdAt', 'title', 'sensitive', 'topics', 'image', 'priority');
    });
    it('Attempt to do a POST request on single article endpoint', async function () {
        const apiResponse = await request(testData.url)
            .post('/articles/2');
        expect(apiResponse.status).to.equal(400);
        expect(apiResponse.body.msg).to.equal('Invalid request');
    });
    it('Attempt to do a PUT request on single article endpoint', async function () {
        const apiResponse = await request(testData.url)
            .put('/articles/2');
        expect(apiResponse.status).to.equal(404);
        expect(apiResponse.text).to.equal('"Endpoint disabled"');
    });
    it('Attempt to do a DELETE request on single article endpoint', async function () {
        const apiResponse = await request(testData.url)
            .delete('/articles/2');
        expect(apiResponse.status).to.equal(404);
        expect(apiResponse.text).to.equal('"Endpoint disabled"');
    });
});