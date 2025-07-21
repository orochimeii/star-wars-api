const express = require('express')
const router = express.Router()
const { getDataAndStore, getData, getCsv } = require('../controllers/dataController')

/**
 *  @swagger
 *  /api/external-data:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      tags: [external-data]
 *      summary: Gets characters from Star Wars
 *      description: Gets characters from Star Wars and saves them to the database
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                data:
 *                  description: Data of the updated items
 *                  type: object
 *                  $ref: "#/components/schemas/external-data"
 *      responses:
 *        200:
 *          description: All items were successfully added
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/external-data"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        405:
 *          description: Invalid input data
 *        500:
 *          description: Some server error
 */
router.post('/external-data', getDataAndStore)
router.get('/data', getData)
router.get('/export-csv', getCsv)

module.exports = router
