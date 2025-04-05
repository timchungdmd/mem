/*
  # Add subscription columns to members table

  This migration adds columns to the `members` table to store subscription-related information.

  1. Modified Tables
    - `members`
      - `subscription_id` (text, nullable): ID of the subscription in the payment gateway.
      - `payment_method` (text, nullable): Payment method used for the subscription.
      - `subscription_status` (text, nullable): Status of the subscription (e.g., 'active', 'inactive', 'trialing').
      - `next_payment_date` (timestamp with time zone, nullable): Date of the next payment.

  2. Security
    - No changes to RLS policies. Existing policies should be sufficient for managing access to these columns.

  3. Notes
    - The `subscription_id` column is used to link the member to their subscription in the payment gateway.
    - The `payment_method` column stores the payment method used for the subscription (e.g., 'credit card', 'paypal').
    - The `subscription_status` column stores the status of the subscription (e.g., 'active', 'inactive', 'trialing').
    - The `next_payment_date` column stores the date of the next payment.
*/

ALTER TABLE members
ADD COLUMN subscription_id TEXT NULL;

ALTER TABLE members
ADD COLUMN payment_method TEXT NULL;

ALTER TABLE members
ADD COLUMN subscription_status TEXT NULL;

ALTER TABLE members
ADD COLUMN next_payment_date TIMESTAMPTZ NULL;
