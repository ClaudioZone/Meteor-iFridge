var samplePostData = [{
    "text": "Passion Fruit Blast",
    "author": "Psy"
}, {
    "text": "Don't forget the soymilk",
    author: "Cla"
}];
var sampleToDos = [{
    member: "Richard",
    todo: "Eat something of the iFridge and sleep",
    hours: "5:00",
    deadline: "2014-08-05 20:00:00",
    status: "false"
}, {
    member: "Caudio",
    todo: "Clean the iFridge",
    hours: "7:00",
    deadline: "2014-08-07 20:00:00",
    status: "false"
}];
var ToBuy = new Meteor.Collection("myToBuy");
var ToDos = new Meteor.Collection("myToDos");
if(Meteor.isClient) {
    Template.main.helpers({
        helloMeteor: "Claudios Meteor iFridge",
        posts: ToBuy.find(),
        todos: ToDos.find(),
    })
    Template.main.events({
        "submit #todoform": function(e) {
            e.preventDefault();
            console.log(e);
            var post = {
                "member": $(e.target).find("[name=member]").val(),
                "todo": $(e.target).find("[name=todo]").val(),
                "hours": $(e.target).find("[name=hours]").val(),
                "deadline": $(e.target).find("[name=deadline]").val(),
                "status": $(e.target).find("[name=status]").val()
            };
            post._id = ToDos.insert(post);
            $(e.target).find("[name=todo]").val("");
        },
        "submit #tobuyform": function(e) {
            e.preventDefault();
            console.log(e);
            var post = {
                "text": $(e.target).find("[name=text]").val()
            };
            post._id = ToBuy.insert(post);
            $(e.target).find("[name=text]").val("");
        },
        "submit #ddrop": function(e) {
            e.preventDefault();
            ToBuy.remove({});
            ToDos.remove({});
            alert('All dropped! Please refresh manually.')
        }
    });
}
if(Meteor.isServer) {
    if(ToBuy.find().count() >= 10) {
         ToBuy.remove({});
         ToDos.remove({});
    }
    
    if(ToBuy.find().count() == 0) {
        ToBuy.insert(samplePostData[0]);
        ToBuy.insert(samplePostData[1]);
    }
    if(ToDos.find().count() == 0) {
        ToDos.insert(sampleToDos[0]);
        ToDos.insert(sampleToDos[1]);
    }
    
    
    
}