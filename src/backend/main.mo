import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  include MixinStorage();

  type User = {
    name : Text;
    email : Text;
    phone : Text;
    location : Text;
    vaccinationCentre : Text;
  };

  type StrayDogImage = {
    image : Storage.ExternalBlob;
    location : Text;
    description : Text;
    uploadedBy : Text;
    timestamp : Time.Time;
  };

  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    image : Storage.ExternalBlob;
  };

  type Event = {
    id : Nat;
    title : Text;
    date : Time.Time;
    location : Text;
    description : Text;
    registrationLink : Text;
  };

  type ChatMessage = {
    sender : Principal;
    message : Text;
    timestamp : Time.Time;
  };

  let users = Map.empty<Principal, User>();
  let strayDogImages = List.empty<StrayDogImage>();
  let products = List.empty<Product>();
  let events = List.empty<Event>();
  let chatMessages = List.empty<ChatMessage>();

  var nextProductId = 1;
  var nextEventId = 1;

  public shared ({ caller }) func registerUser(name : Text, email : Text, phone : Text, location : Text, vaccinationCentre : Text) : async () {
    let user : User = {
      name;
      email;
      phone;
      location;
      vaccinationCentre;
    };
    users.add(caller, user);
  };

  public shared ({ caller }) func uploadStrayDogImage(image : Storage.ExternalBlob, location : Text, description : Text, uploadedBy : Text) : async () {
    let strayDogImage : StrayDogImage = {
      image;
      location;
      description;
      uploadedBy;
      timestamp = Time.now();
    };
    strayDogImages.add(strayDogImage);
  };

  public query ({ caller }) func getAllStrayDogImages() : async [StrayDogImage] {
    strayDogImages.toArray();
  };

  public shared ({ caller }) func addProduct(name : Text, description : Text, price : Nat, image : Storage.ExternalBlob) : async () {
    let product : Product = {
      id = nextProductId;
      name;
      description;
      price;
      image;
    };
    products.add(product);
    nextProductId += 1;
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.toArray();
  };

  public shared ({ caller }) func addEvent(title : Text, date : Time.Time, location : Text, description : Text, registrationLink : Text) : async () {
    let event : Event = {
      id = nextEventId;
      title;
      date;
      location;
      description;
      registrationLink;
    };
    events.add(event);
    nextEventId += 1;
  };

  public query ({ caller }) func getAllEvents() : async [Event] {
    events.toArray();
  };

  public shared ({ caller }) func sendMessage(message : Text) : async () {
    let chatMessage : ChatMessage = {
      sender = caller;
      message;
      timestamp = Time.now();
    };
    chatMessages.add(chatMessage);
  };

  public query ({ caller }) func getAllMessages() : async [ChatMessage] {
    chatMessages.toArray();
  };

  public query ({ caller }) func getUser(principal : Principal) : async User {
    switch (users.get(principal)) {
      case (null) { Runtime.trap("User not found") };
      case (?user) { user };
    };
  };
};
