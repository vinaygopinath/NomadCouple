import { NomadCouplePage } from './app.po';

describe('nomad-couple App', function() {
  let page: NomadCouplePage;

  beforeEach(() => {
    page = new NomadCouplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
