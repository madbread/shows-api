function pageState(userStateFactory, showFactory) {

  return {
    controllerAs: 'pageStateVM',
    bindToController: true,
    controller: function (Auth, $scope) {
      var vm = this;

      var mode = 'POST';

      var editShowId;

      vm.userState = userStateFactory.get();
      vm.showData = {};
      vm.btnText = 'New Show';

      // Watch for authorization, then load shows
      $scope.$watch(function () {
        return vm.userState.authorized;
      }, function (authorized) {
        if (authorized) {
          showFactory.init()
            .then(function(data) {
              vm.showData = data;
            }, function(err) {
              console.error('Error Getting Shows: ', err);
            });
        }
      });

      vm.initForm = function() {

        mode = 'POST';
        editShowId = undefined;
        vm.btnText = 'New Show';

        vm.showForm = false;
        vm.formData = {
          venue: '',
          date: '',
          time: '',
          subtitle: '',
          address: '',
          maplink: '',
          description: '',
          website: ''
        };

      };

      vm.initForm();

      vm.submitShow = function() {

        if (mode === 'POST') {

          showFactory.newShow(vm.formData).then(
            function(success) {
              console.log('Successful show post: ', success);
              showFactory.init();
              vm.initForm();
            },
            function(error) {
              console.error(error);
            }
          );

        } else if (mode === 'PUT') {

          showFactory.editShow(editShowId, vm.formData).then(
            function(success) {
              console.log('Successful show post: ', success);
              showFactory.init();
              vm.initForm();
            },
            function(error) {
              console.error(error);
            }
          );

        }

      };

      vm.addShowToForm = function(show) {
        editShowId = show._id;
        vm.formData = show;
        vm.showForm = true;
        mode = 'PUT';
        vm.btnText = 'Edit Show';
      };

      vm.duplicateShow = function(show) {
        editShowId = undefined;
        vm.formData = angular.copy(show);
        vm.showForm = true;
      };

      vm.deleteShow = function(id) {
        if (confirm('Are you sure?')) {
          showFactory.deleteShow(id).then(
            function(success) {
              console.log('Successful show deletion: ', success);
              showFactory.init();
              vm.initForm();
            },
            function(error) {
              console.error(error);
            }
          );
        }
      };

      // function to handle logging out
      vm.doLogout = function() {
        Auth.logout();
        userStateFactory.authorize(false);
      };

    }
  };

}

angular.module('ShowsAPI').
directive('pageState', pageState);
