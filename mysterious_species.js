// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
  }
  
  // Returns a random single strand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand
  }
  
  // P. Aequor Factory 
  function pAequorFactory(num, baseArr) {
    return {
      specimenNum: num,
      dna: baseArr,
      mutate() {
        let idx = Math.floor(Math.random() * 15); //grab a random index
        let baseToChange = this.dna[idx]; //for checking against new base
        console.log(baseToChange);
        let newBase = returnRandBase();
        console.log(newBase);
        while (baseToChange === newBase) {
          newBase = returnRandBase();
        }
        this.dna[idx] = newBase;
        return this.dna;
      },
      compareDNA(otherDNA) {
        let count = 0;
        for (let i = 0; i < 15; i++) {
          if (this.dna[i] === otherDNA.dna[i]) {
            count++;
          }
        }
        const percentage = Math.round((count/15)*100);
        /*console.log(`specimen #${this.specimenNum} and specimen #${otherDNA.specimenNum} have ${percentage}% DNA in common`);*/
        return percentage;
      },
      willLikelySurvive() {
        let minRequired = 9;
        let willSurvive = false;
        let count = 0;
        for (let i = 0; i < 15; i++) {
          if (this.dna[i] === 'C' || this.dna[i] === 'G') {
            count++;
          }
        }
        if (count >= minRequired) {
          willSurvive = true;
        }
        return willSurvive;
      },
      complementStrand() {
        let complementStrand = [];
        for (let i = 0; i < 15; i++) {
          switch (this.dna[i]) {
            case 'A':
              complementStrand[i] = 'T';
              break;
            case 'C':
              complementStrand[i] = 'G';
              break;
            case 'G':
              complementStrand[i] = 'C';
              break;
            case 'T':
              complementStrand[i] = 'A';
              break;
            default:
              break;
          }
        }
        return complementStrand;
      }
    };
  };
  
  let newSpecies = pAequorFactory(1, mockUpStrand());
  let newSpecies2 = pAequorFactory(2, mockUpStrand());
  //newSpecies2.compareDNA(newSpecies.dna);
  //console.log(newSpecies.mutate());
  //console.log(newSpecies);
  
  function create30() {
    let speciesArr = [];
    let i = 1;
    while(speciesArr.length < 30) {
      let newSpecies = pAequorFactory(i, mockUpStrand());
      if (newSpecies.willLikelySurvive()) {
        speciesArr.push(newSpecies);
        i++;
      }
      
    }
    return speciesArr;
  };
  
  let newSpeciesBatch = create30();
  
  //Find two most related instances of pAequor in Batch
  function findMostRelated(batchArr) {
    let species1;
    let species2;
    let currentHighest = 0;
    for (let i = 0; i < batchArr.length-1; i++) {
      for (let j = i+1; j < batchArr.length; j++) {
        //console.log( `This is i: ${i} and this is j ${j}`);
        let percentage = batchArr[i].compareDNA(batchArr[j]);
        if (percentage > currentHighest) {
          currentHighest = percentage;
          species1 = batchArr[i];
          species2 = batchArr[j];
        }
      }
    }
    console.log(`The most related instances of pAequor in the provided batch are species ${species1.specimenNum} and species ${species2.specimenNum} with ${currentHighest}% DNA in common.`);
  }
  
  findMostRelated(newSpeciesBatch);
  
  
  
  