/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    const chain = {};
    for(let i = 0; i < this.words.length; i++){
      let curWord = this.words[i].toLowerCase();
      if(!chain[curWord]){
        chain[curWord] = [];
      }
      if(this.words[i + 1] != null){
        chain[curWord].push(this.words[i + 1].toLowerCase());
      }
    }
    this.chain = chain;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let curWords = Object.keys(this.chain);
    let randWord = curWords[Math.floor(Math.random() * curWords.length)];
    let alterText = [];

    console.log(curWords);

    while(alterText.length < numWords && alterText.length < curWords.length){
      alterText.push(randWord);
      let nextWord = this.chain[randWord][Math.floor(Math.random() * this.chain[randWord].length)];
      randWord = nextWord;

      if (!randWord || !this.chain.hasOwnProperty(randWord)){
        randWord = curWords[Math.floor(Math.random() * curWords.length)]
      }
    }
    return alterText.join(" ");
  }
}

module.exports = {MarkovMachine};
