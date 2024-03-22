const { program } = require("commander");
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const options = program.opts();

const Contacts = require("./db/contacts");

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        const allContacts = await Contacts.listContacts();
        console.table(allContacts);
        break;

      case "get":
        const contact = await Contacts.getContactById(id);
        console.log(contact);
        break;

      case "add":
        const newContact = await Contacts.addContact(name, email, phone);
        console.log(newContact);
        break;

      case "remove":
        const removedContact = await Contacts.removeContact(id);
        console.log(removedContact);
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.error(error);
  }
}

invokeAction(options);