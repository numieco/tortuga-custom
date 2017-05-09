import React from 'react';


describe('Comment item', () => {
  const wrapper = shallow(<Comment />);

  it('should be a list item', () => {
    expect(wrapper.type()).to.eql('li');
  });
});

describe('a passing test', () => {
  it('should pass', () => {
    expect(true).to.be.true;
  });
});
