export class AuthorizationChecker {
    load(userPermissionsMap) {
        this.userPermissionsMap = userPermissionsMap; /**
        {
            0: true, 1: false, 2: true, 3: false
        }; */
    }

    hasAccessTo(action) {
        return this.userPermissionsMap[action];
    }
}

export const ACTIONS = {
    Category1_Subcategory1_Feature1: 0,
    Category1_Subcategory2_Feature2: 1,
    Category2_Subcategory1_Feature3: 2,
    Category2_Subcategory2_Feature4: 3
};
