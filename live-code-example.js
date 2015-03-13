var app = {};

app.createUser = function(user, password) {
  crypton.generateAccount(user, password, function (err, account){
    if (err) { console.error(err); return;}
    console.log(account);
  })
};

app.auth = function (username, password) {
  crypton.authorize(username, password, function (err, session) {
    if (err) { console.error(err); return;}
    app.session = session;
    console.log(session);
  });
};

app.getPeer = function (name) {
  app.session.getPeer(name, function(err, peer){
    if (err) { console.error(err); return;}
    app.peer = peer;
    console.log(peer);
  });
};

app.trustPeer = function (peer) {
  peer.trust(function (err) {
    if (err) {console.error(err); return;}
    console.log('peer is trusted');
  });
};

app.sendMessage = function (peerName, textMessage) {
  app.session.getPeer(peerName, function (err, peer) {
    if (err) {console.error(err); return;}
    if (!peer.trusted) {
      console.error('peer not trusted!');
      return;
    }
    var headers = {testAppMessage: true};
    var payload = {content: textMessage};
    peer.sendMessage(headers, payload, function (err, messageId){
      if (err) { console.error(err); return;}
      console.log('message ID: ', messageId);
    });
  });
};

app.getMessages = function () {
  app.session.inbox.poll(function (rawMessages) {
    console.log(rawMessages);
  });
};

app.createContainer = function (name) {
  app.session.create(name, function (err, container) {
     if (err) { console.error(err); return;}
     console.log('container created');
  });
};

app.loadContainer = function (name) {
  app.session.load(name, function (err, container) {
    if (err) { console.error(err); return;}
    app.currentContainer = container;
  });
};

app.loadHMACContainer = function (hmac, peer) {
  app.session.loadWithHmac(hmac, peer, function (err, container) {
    if (err) { console.error(err); return;}
    app.currentContainer = container;
  });
};
