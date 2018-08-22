({
    loadCats : function(component, event, helper) {
        var action = component.get("c.getCandidates");
        action.setCallback(this, function(response){
            if(response.getState()==="SUCCESS" && component.isValid()){
                component.set("v.cats",response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    loadNew : function(component, event, helper) {
        var loadEvent = $A.get("e.c:CatsClickEvent");
        loadEvent.setParams({"new":true});
        loadEvent.fire();
    },
})