// index.js

const Translate = function(set = {}) {
  this.translate = (source) => {
    console.log(source);
    return 'bar';
  };

  this.getSet = () => {
    return set;
  };

  this.updateSet = (update = undefined) => {
    set = update;
  };

  return this;
};

exports = module.exports = Translate;