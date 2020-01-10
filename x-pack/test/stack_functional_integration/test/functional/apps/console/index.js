/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */


export default function ({ loadTestFile, getService }) {

  const browser = getService('browser');

  before(async () => {
    await browser.setWindowSize(1200, 800);
  });
  describe('console app', function () {
    loadTestFile(require.resolve('./console'));
  });
}