

  var path = require('path');
  var mt = require('mersenne');
  var fs = require('fs');

  var ffn = fs.readFileSync(path.join(process.env.HOME,'/Dropbox/Resources/female-first-name.txt')).toString().split("\n");
  var mfn = fs.readFileSync(path.join(process.env.HOME,'/Dropbox/Resources/male-first-name.txt')).toString().split("\n");
  var aln = fs.readFileSync(path.join(process.env.HOME,'/Dropbox/Resources/all-last-name.txt')).toString().split("\n");

  var photos = fs.readdirSync(path.join(process.env.HOME,"/Dropbox/Resources/profilePictures"));
  var sents = fs.readFileSync(path.join(process.env.HOME,"/Dropbox/Resources/clean-corpus.en"), "utf8").split("\n");


  function onlyFirst( array ){
    var size = array.length;
    var out = new Array();
    for(var i=0; i < size; i++) {
       tmp = array[i].split(/\s+/)[0];

       if( tmp != "") out.push(tmp);
    }
    return out;
  }

  ffn = onlyFirst(ffn);
  mfn = onlyFirst(mfn);
  aln = onlyFirst(aln);

  ffn_size = ffn.length;
  mfn_size = mfn.length;
  aln_size = aln.length;
  pho_size = photos.length;
  var sents_size = sents.length;

  var firstname = function(){
    if( Math.random() > 0.5 )
      return ffn[ Math.floor(Math.random()* ffn_size )];
    else
      return mfn[ Math.floor(Math.random()* mfn_size )];
  }

  var lastname = function(){
    return aln[ Math.floor(Math.random()* aln_size )];
  }

  exports.firstname = firstname
  exports.lastname = lastname

  exports.randomSent = function(){
    return sents[Math.floor(mt.rand(sents_size))].replace(/\r|\n/,"");
  };

  exports.email = function(){
    return firstname().toLowerCase() + lastname().toLowerCase() + '@gmail.com';
  }