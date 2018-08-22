({
/**
* @name: doInit
* @date: 17 DEC 2017
* @description: This method is handler method of UpdateStudent component and hence it will be
* call on the time of component initial load.
* This method is responsible to fetch the existing record.
**/
doInit : function(component, event, helper) {
//Calling server side controller's fetchStudentDetails() method.
var action = component.get("c.fetchStudentDetails");
//Set method parameter of updateStudent() method, where "v.recordId" returns object record
action.setParams({"studentId": component.get("v.recordId")});
action.setCallback(this, function(response){
//<response.getState()> return response status as SUCCESS/ERROR/INCOMPLETE etc.
var state = response.getState();
console.log("state="+state)
//If response from server side is <SUCCESS>, then we will set the component attribute "
if (state === "SUCCESS"){
var responseStudentRecord = response.getReturnValue();
component.set("v.studentObj", responseStudentRecord);
}else if (state === "INCOMPLETE") {
//Offline message display logic.
var toastEvent = $A.get("e.force:showToast");
toastEvent.setParams({
"title": "OFFLINE!",
"message": "You are in offline."
});
toastEvent.fire();
}else if (state === "ERROR") {
//Error message display logic.
var errors = response.getError();
var toastEvent = $A.get("e.force:showToast");
toastEvent.setParams({
"title": "ERROR!",
"message": errors[0].message
});
toastEvent.fire();
}else {
//Unknown message display logic.
var toastEvent = $A.get("e.force:showToast");
toastEvent.setParams({
"title": "UNKOWN!",
"message": "Unknown error."
});
toastEvent.fire();
}
});
$A.enqueueAction(action);
},
/**
* @name: doCancel
* @date: 17 DEC 2017
* @description: This method is responsible to cancel or close the modal window.
**/
doCancel : function(component, event, helper) {
var cmpTargetForEdit = component.find('modalIdForEditStudent');
var cmpBackDropForEdit = component.find('backdropIdForEditStudent');
$A.util.removeClass(cmpBackDropForEdit,'slds-backdrop--open');
$A.util.removeClass(cmpTargetForEdit, 'slds-fade-in-open');
},
/**
* @name: doSave
* @date: 17 DEC 2017
* @description: This method is responsible to save student record.
**/
doSave : function(component, event, helper) {
/** Server side controller calling logic. **/
//Calling server side controller's updateStudent() method.
var action = component.get("c.updateCandidate");
//Set method parameter of updateStudent() method.
action.setParams({"candidate": component.get("v.studentObj")});
action.setCallback(this, function(response){
//<response.getState()> return response status as SUCCESS/ERROR/INCOMPLETE etc.
var state = response.getState();
console.log("state="+state)
//If response from server side is <SUCCESS>, then we will display a success message.
if (state === "SUCCESS"){
//Success message display logic.
var toastEvent = $A.get("e.force:showToast");
toastEvent.setParams({
"title": "Success!",
"message": "Student record has been updated successfully."
});
toastEvent.fire();
//Navigate to detail page.
window.location ="/"+component.get("v.recordId");
}else if (state === "INCOMPLETE") {
//Offline message display logic.
var toastEvent = $A.get("e.force:showToast");
toastEvent.setParams({
"title": "OFFLINE!",
"message": "You are in offline."
});
toastEvent.fire();
}else if (state === "ERROR") {
//Error message display logic.
var errors = response.getError();
var toastEvent = $A.get("e.force:showToast");
toastEvent.setParams({
"title": "ERROR!",
"message": errors[0].message
});
toastEvent.fire();
}else {
//Unknown message display logic.
var toastEvent = $A.get("e.force:showToast");
toastEvent.setParams({
"title": "UNKOWN!",
"message": "Unknown error."
});
toastEvent.fire();
}
});
$A.enqueueAction(action);
}
})