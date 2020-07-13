export default class Service{
    constructor(){
        this._apiBase = 'https://anapioficeandfire.com/api';
    }

    async getResource(url){
        const res = await fetch(`${this._apiBase}${url}`);

            if (!res.ok) {
                throw new Error(`Could not fetch ${url}, status: ${res.status}`);
            }


           return await res.json();
    }

    getAllBooks() {
        return this.getResource(`/books/`);
    }
    
    getBook(id) {
        return this.getResource(`/books/${id}/`);
    }
    
    async getAllCharacters() {
        const result = await this.getResource(`/characters?page=5&pageSize=10`);
        return result.map(this._transformChar);
    }
    
    async getCharacter (id) {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformChar(character);
    }
    
    getAllHouses() {
        return this.getResource(`/houses/`);
    }
    
    getHouse(id) {
        return this.getResource(`/houses/${id}/`);
    }

    isSet(data){
        if(data){
            return data
        }else {
            return 'No info '
        }
    }
    _transformChar(char){
        return{
            name: this.isSet(char.name),
            gender: this.isSet(char.gender),
            born: this.isSet(char.born),
            died: this.isSet(char.died),
            culture: this.isSet(char.culture)
        }
    }
}