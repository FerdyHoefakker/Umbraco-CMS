/**
 * @ngdoc controller
 * @name Umbraco.Editors.MemberType.CreateController
 * @function
 *
 * @description
 * The controller for the member type creation dialog
 */
function MemberTypesCreateController($scope, $location, navigationService, memberTypeResource, formHelper, appState) {

    $scope.model = {
        folderName: "",
        creatingFolder: false
    };

    var node = $scope.dialogOptions.currentNode;

    $scope.showCreateFolder = function() {
        $scope.model.creatingFolder = true;
    }

    $scope.createFolder = function () {
        if (formHelper.submitForm({ scope: $scope, formCtrl: this.createFolderForm, statusMessage: "Creating folder..." })) {
            memberTypeResource.createFolder(node.id, $scope.model.folderName).then(function (folderId) {

                navigationService.hideMenu();
                var currPath = node.path ? node.path : "-1";
                navigationService.syncTree({ tree: "membertypes", path: currPath + "," + folderId, forceReload: true, activate: true });

                formHelper.resetForm({ scope: $scope });

                var section = appState.getSectionState("currentSection");

            }, function(err) {

               //TODO: Handle errors
            });
        };
    }

    $scope.createMemberType = function() {
        $location.search('create', null);
        $location.path("/settings/membertypes/edit/" + node.id).search("create", "true");
        navigationService.hideMenu();
    }
}

angular.module('umbraco').controller("Umbraco.Editors.MemberTypes.CreateController", MemberTypesCreateController);