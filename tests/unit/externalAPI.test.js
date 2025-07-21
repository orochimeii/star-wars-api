const axios = require('axios')
const externalAPI = require('../../src/services/externalAPI')

jest.mock('axios')

describe('externalAPI service', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('getCharacters should return character list from BASE_URL', async () => {
        const mockData = { data: { results: [{ name: 'Luke' }] } }
        axios.get.mockResolvedValue(mockData)

        const result = await externalAPI.getCharacters()
        expect(axios.get).toHaveBeenCalled()
        expect(result).toEqual(mockData.data)
    })

    test('getCharacterInfo should return character details from URL', async () => {
        const mockCharacter = {
            data: { result: { properties: { name: 'Luke', height: '172' } } },
        }
        axios.get.mockResolvedValue(mockCharacter)

        const result = await externalAPI.getCharacterInfo('https://example.com/character/1')
        expect(axios.get).toHaveBeenCalledWith('https://example.com/character/1')
        expect(result).toEqual(mockCharacter.data.result.properties)
    })
})
