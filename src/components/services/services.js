export default class Service{
    constructor(){
        this._apiBase = 'https://anapioficeandfire.com/api';
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

            if (!res.ok) {
                throw new Error(`Could not fetch ${url}, status: ${res.status}`);
            }


           return await res.json();
    }

    getAllBooks = async () => {
        const result = await this.getResource(`/books/`);
        return result.map(this._transformBook)
    }
    
    getBook = async (id) => {
        const book = this.getResource(`/books/${id}/`);
        return this._transformChar(book);
    }
    
    getAllCharacters = async () => {
        const result = await this.getResource(`/characters?page=5&pageSize=10`);
        // return result;
        return result.map(this._transformChar)
    }
    
    getCharacter = async (id) => {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformChar(character);
    }
    
    getAllHouses = async () => {
        const result = await this.getResource(`/houses/`);
        return result.map(this._transformHouse)
    }
    
    getHouse = async (id) => {
        const house = this.getResource(`/houses/${id}/`);
        return this._transformHouse(house);

    }

    isSet(data){
        if(data){
            return data
        }else {
            return 'No info '
        }
    }

    _extractId(url){
        return url.match(/\/([0-9]*)$/)[1];
    }

    _transformChar = (char) => {
        return{
            id: this._extractId(char.url),
            name: this.isSet(char.name),
            gender: this.isSet(char.gender),
            born: this.isSet(char.born),
            died: this.isSet(char.died),
            culture: this.isSet(char.culture)
        };
    }

    _transformHouse = (house) => {
        return{
            id: this._extractId(house.url),
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        };
    }

    _transformBook = (book) => {
        return {
            id: this._extractId(book.url),
            name: book.name,
            numberOfPages: book.numberOfPages,
            publiser: book.publiser,
            released: book.released
        };
    }
}