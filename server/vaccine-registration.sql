\echo 'Delete and recreate vaccination_registration db?'
\prompt 'Return for yes or control-C to cancel >' answer

DROP DATABASE vaccine_registration;
CREATE DATABASE vaccine_registration;
\c vaccine_registration;

\i vaccine_registration-schema.sql