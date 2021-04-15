import {expect} from 'chai';
import {agent as request} from 'supertest';
import {getTestData} from "../../testdata/TestData.data";

const testData = getTestData();
describe('Testing the list of articles endpoint', () => {
    it('Successfully perform the GET request on the list of articles endpoint', async function () {
        const apiResponse = await request(testData.url)
            .get('/articles');
        expect(apiResponse.status).to.equal(200);
        apiResponse.body.forEach(article => {
            expect(article).has.all.keys(
                'id', 'createdAt', 'title', 'sensitive', 'topics', 'image', 'priority');
        });
    });
    it('Attempt to do a POST request on list of articles endpoint', async function () {
        const apiResponse = await request(testData.url)
            .post('/articles');
        expect(apiResponse.status).to.equal(404);
        expect(apiResponse.text).to.equal('"Endpoint disabled"');
    });
    it('Attempt to do a PUT request on list of articles endpoint', async function () {
        const apiResponse = await request(testData.url)
            .put('/articles');
        expect(apiResponse.status).to.equal(400);
        expect(apiResponse.body.msg).to.equal('Invalid request');
    });
    it('Attempt to do a DELETE request on list of articles endpoint', async function () {
        const apiResponse = await request(testData.url)
            .delete('/articles');
        expect(apiResponse.status).to.equal(400);
        expect(apiResponse.body.msg).to.equal('Invalid request');
    });
});