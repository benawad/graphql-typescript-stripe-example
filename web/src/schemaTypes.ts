/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MeQuery
// ====================================================

export interface MeQuery_me {
  id: string;
  email: string;
  type: string;
  ccLast4: string | null;
}

export interface MeQuery {
  me: MeQuery_me | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CancelSubscriptionMutation
// ====================================================

export interface CancelSubscriptionMutation_cancelSubscription {
  id: string;
  email: string;
  type: string;
  ccLast4: string | null;
}

export interface CancelSubscriptionMutation {
  cancelSubscription: CancelSubscriptionMutation_cancelSubscription | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChangeCreditCardMutation
// ====================================================

export interface ChangeCreditCardMutation_changeCreditCard {
  id: string;
  email: string;
  type: string;
  ccLast4: string | null;
}

export interface ChangeCreditCardMutation {
  changeCreditCard: ChangeCreditCardMutation_changeCreditCard | null;
}

export interface ChangeCreditCardMutationVariables {
  source: string;
  ccLast4: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateSubscriptionMutation
// ====================================================

export interface CreateSubscriptionMutation_createSubcription {
  id: string;
  email: string;
  type: string;
  ccLast4: string | null;
}

export interface CreateSubscriptionMutation {
  createSubcription: CreateSubscriptionMutation_createSubcription | null;
}

export interface CreateSubscriptionMutationVariables {
  source: string;
  ccLast4: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginMutation
// ====================================================

export interface LoginMutation_login {
  id: string;
  email: string;
  type: string;
  ccLast4: string | null;
}

export interface LoginMutation {
  login: LoginMutation_login | null;
}

export interface LoginMutationVariables {
  email: string;
  password: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterMutation
// ====================================================

export interface RegisterMutation {
  register: boolean;
}

export interface RegisterMutationVariables {
  email: string;
  password: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserInfo
// ====================================================

export interface UserInfo {
  id: string;
  email: string;
  type: string;
  ccLast4: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
