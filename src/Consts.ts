
export default class Consts {
    static TP_IDP_Microsoft: string = 
        '|<ClaimsProvider>\r\n' +
        '|  <Domain>live.com</Domain>\r\n' +
        '|  <DisplayName>Microsoft Account</DisplayName>\r\n' +
        '|  <TechnicalProfiles>\r\n' +
        '|    <TechnicalProfile Id="MSA-OIDC">\r\n' +
        '|      <DisplayName>Microsoft Account</DisplayName>\r\n' +
        '|      <Protocol Name="OpenIdConnect" />\r\n' +
        '|      <Metadata>\r\n' +
        '|        <Item Key="ProviderName">https://login.live.com</Item>\r\n' +
        '|        <Item Key="METADATA">https://login.live.com/.well-known/openid-configuration</Item>\r\n' +
        '|        <Item Key="response_types">code</Item>\r\n' +
        '|        <Item Key="response_mode">form_post</Item>\r\n' +
        '|        <Item Key="scope">openid profile email</Item>\r\n' +
        '|        <Item Key="HttpBinding">POST</Item>\r\n' +
        '|        <Item Key="UsePolicyInRedirectUri">0</Item>\r\n' +
        '|        <Item Key="client_id">Your Microsoft application client id</Item>\r\n' +
        '|      </Metadata>\r\n' +
        '|      <CryptographicKeys>\r\n' +
        '|        <Key Id="client_secret" StorageReferenceId="B2C_1A_MSASecret" />\r\n' +
        '|      </CryptographicKeys>\r\n' +
        '|      <OutputClaims>\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="identityProvider" DefaultValue="live.com" />\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="authenticationSource" DefaultValue="socialIdpAuthentication" />\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="socialIdpUserId" PartnerClaimType="sub" />\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="displayName" PartnerClaimType="name" />\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="email" />\r\n' +
        '|      </OutputClaims>\r\n' +
        '|      <OutputClaimsTransformations>\r\n' +
        '|        <OutputClaimsTransformation ReferenceId="CreateRandomUPNUserName" />\r\n' +
        '|        <OutputClaimsTransformation ReferenceId="CreateUserPrincipalName" />\r\n' +
        '|        <OutputClaimsTransformation ReferenceId="CreateAlternativeSecurityId" />\r\n' +
        '|        <OutputClaimsTransformation ReferenceId="CreateSubjectClaimFromAlternativeSecurityId" />\r\n' +
        '|      </OutputClaimsTransformations>\r\n' +
        '|      <UseTechnicalProfileForSessionManagement ReferenceId="SM-SocialLogin" />\r\n' +
        '|    </TechnicalProfile>\r\n' +
        '|  </TechnicalProfiles>\r\n' +
        '|</ClaimsProvider>';

    static TP_IDP_Google: string = 
        '|<ClaimsProvider>\r\n' +
        '|  <Domain>google.com</Domain>\r\n' +
        '|  <DisplayName>Google</DisplayName>\r\n' +
        '|  <TechnicalProfiles>\r\n' +
        '|    <TechnicalProfile Id="Google-OAUTH">\r\n' +
        '|      <DisplayName>Google</DisplayName>\r\n' +
        '|        <Protocol Name="OAuth2" />\r\n' +
        '|        <Metadata>\r\n' +
        '|          <Item Key="ProviderName">google</Item>\r\n' +
        '|          <Item Key="authorization_endpoint">https://accounts.google.com/o/oauth2/auth</Item>\r\n' +
        '|          <Item Key="AccessTokenEndpoint">https://accounts.google.com/o/oauth2/token</Item>\r\n' +
        '|          <Item Key="ClaimsEndpoint">https://www.googleapis.com/oauth2/v1/userinfo</Item>\r\n' +
        '|          <Item Key="scope">email</Item>\r\n' +
        '|          <Item Key="HttpBinding">POST</Item>\r\n' +
        '|          <Item Key="UsePolicyInRedirectUri">0</Item>\r\n' +
        '|          <Item Key="client_id">Your Google+ application ID</Item>\r\n' +
        '|        </Metadata>\r\n' +
        '|        <CryptographicKeys>\r\n' +
        '|          <Key Id="client_secret" StorageReferenceId="B2C_1A_GoogleSecret" />\r\n' +
        '|        </CryptographicKeys>\r\n' +
        '|        <OutputClaims>\r\n' +
        '|          <OutputClaim ClaimTypeReferenceId="socialIdpUserId" PartnerClaimType="id" />\r\n' +
        '|          <OutputClaim ClaimTypeReferenceId="email" PartnerClaimType="email" />\r\n' +
        '|          <OutputClaim ClaimTypeReferenceId="givenName" PartnerClaimType="given_name" />\r\n' +
        '|          <OutputClaim ClaimTypeReferenceId="surname" PartnerClaimType="family_name" />\r\n' +
        '|          <OutputClaim ClaimTypeReferenceId="displayName" PartnerClaimType="name" />\r\n' +
        '|          <OutputClaim ClaimTypeReferenceId="identityProvider" DefaultValue="google.com" />\r\n' +
        '|          <OutputClaim ClaimTypeReferenceId="authenticationSource" DefaultValue="socialIdpAuthentication" />\r\n' +
        '|        </OutputClaims>\r\n' +
        '|          <OutputClaimsTransformations>\r\n' +
        '|          <OutputClaimsTransformation ReferenceId="CreateRandomUPNUserName" />\r\n' +
        '|          <OutputClaimsTransformation ReferenceId="CreateUserPrincipalName" />\r\n' +
        '|          <OutputClaimsTransformation ReferenceId="CreateAlternativeSecurityId" />\r\n' +
        '|          <OutputClaimsTransformation ReferenceId="CreateSubjectClaimFromAlternativeSecurityId" />\r\n' +
        '|        </OutputClaimsTransformations>\r\n' +
        '|        <UseTechnicalProfileForSessionManagement ReferenceId="SM-SocialLogin" />\r\n' +
        '|        <ErrorHandlers>\r\n' +
        '|          <ErrorHandler>\r\n' +
        '|              <ErrorResponseFormat>json</ErrorResponseFormat>\r\n' +
        '|              <ResponseMatch>$[?(@@.error == \'invalid_grant\')]</ResponseMatch>\r\n' +
        '|              <Action>Reauthenticate</Action>\r\n' +
        '|              <!--In case of authorization code used error, we don\'t want the user to select his account again.-->\r\n' +
        '|              <!--AdditionalRequestParameters Key="prompt">select_account</AdditionalRequestParameters-->\r\n' +
        '|          </ErrorHandler>\r\n' +
        '|        </ErrorHandlers>\r\n' +
        '|    </TechnicalProfile>\r\n' +
        '|  </TechnicalProfiles>\r\n' +
        '|</ClaimsProvider>';

    static TP_IDP_AzureAD: string = 
        '|<ClaimsProvider>\r\n' +
        '|  <Domain>Contoso</Domain>\r\n' +
        '|  <DisplayName>Login using Contoso</DisplayName>\r\n' +
        '|  <TechnicalProfiles>\r\n' +
        '|    <TechnicalProfile Id="ContosoProfile">\r\n' +
        '|      <DisplayName>Contoso Employee</DisplayName>\r\n' +
        '|      <Description>Login with your Contoso account</Description>\r\n' +
        '|      <Protocol Name="OpenIdConnect"/>\r\n' +
        '|      <OutputTokenFormat>JWT</OutputTokenFormat>\r\n' +
        '|      <Metadata>\r\n' +
        '|        <Item Key="METADATA">https://login.windows.net/contoso.com/.well-known/openid-configuration</Item>\r\n' +
        '|        <Item Key="ProviderName">https://sts.windows.net/00000000-0000-0000-0000-000000000000/</Item>\r\n' +
        '|        <Item Key="client_id">00000000-0000-0000-0000-000000000000</Item>\r\n' +
        '|        <Item Key="IdTokenAudience">00000000-0000-0000-0000-000000000000</Item>\r\n' +
        '|        <Item Key="response_types">id_token</Item>\r\n' +
        '|        <Item Key="UsePolicyInRedirectUri">false</Item>\r\n' +
        '|      </Metadata>\r\n' +
        '|      <CryptographicKeys>\r\n' +
        '|        <Key Id="client_secret" StorageReferenceId="B2C_1A_ContosoAppSecret"/>\r\n' +
        '|      </CryptographicKeys>\r\n' +
        '|      <OutputClaims>\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="socialIdpUserId" PartnerClaimType="oid"/>\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="tenantId" PartnerClaimType="tid"/>\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="givenName" PartnerClaimType="given_name" />\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="surName" PartnerClaimType="family_name" />\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="displayName" PartnerClaimType="name" />\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="authenticationSource" DefaultValue="contosoAuthentication" />\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="identityProvider" DefaultValue="AzureADContoso" />\r\n' +
        '|      </OutputClaims>\r\n' +
        '|      <OutputClaimsTransformations>\r\n' +
        '|        <OutputClaimsTransformation ReferenceId="CreateRandomUPNUserName"/>\r\n' +
        '|        <OutputClaimsTransformation ReferenceId="CreateUserPrincipalName"/>\r\n' +
        '|        <OutputClaimsTransformation ReferenceId="CreateAlternativeSecurityId"/>\r\n' +
        '|        <OutputClaimsTransformation ReferenceId="CreateSubjectClaimFromAlternativeSecurityId"/>\r\n' +
        '|      </OutputClaimsTransformations>\r\n' +
        '|      <UseTechnicalProfileForSessionManagement ReferenceId="SM-Noop"/>\r\n' +
        '|    </TechnicalProfile>\r\n' +
        '|  </TechnicalProfiles>\r\n' +
        '|</ClaimsProvider>';

    static TP_IDP_AzueADMulti: string = 
        '|<ClaimsProvider>\r\n' +
        '|  <Domain>commonaad</Domain>\r\n' +
        '|  <DisplayName>Common AAD</DisplayName>\r\n' +
        '|  <TechnicalProfiles>\r\n' +
        '|    <TechnicalProfile Id="Common-AAD">\r\n' +
        '|      <DisplayName>Multi-Tenant AAD</DisplayName>\r\n' +
        '|      <Protocol Name="OpenIdConnect" />\r\n' +
        '|      <Metadata>\r\n' +
        '|        <!-- Update the Client ID below to the Application ID -->\r\n' +
        '|        <Item Key="client_id">00000000-0000-0000-0000-000000000000</Item>\r\n' +
        '|        <Item Key="UsePolicyInRedirectUri">0</Item>\r\n' +
        '|        <Item Key="METADATA">https://login.microsoftonline.com/common/.well-known/openid-configuration</Item>\r\n' +
        '|        <Item Key="response_types">code</Item>\r\n' +
        '|        <Item Key="scope">openid</Item>\r\n' +
        '|        <Item Key="response_mode">form_post</Item>\r\n' +
        '|        <Item Key="HttpBinding">POST</Item>\r\n' +
        '|        <Item Key="DiscoverMetadataByTokenIssuer">true</Item>\r\n' +
        '|\r\n' +
        '|        <!-- The key below allows you to specify each of the Azure AD tenants that can be used to sign in. If you would like only specific tenants to be able to sign in, uncomment the line below and update the GUIDs. -->\r\n' +
        '|        <!-- <Item Key="ValidTokenIssuerPrefixes">https://sts.windows.net/00000000-0000-0000-0000-000000000000,https://sts.windows.net/11111111-1111-1111-1111-111111111111</Item> -->\r\n' +
        '|\r\n' +
        '|        <!-- The commented key below specifies that users from any tenant can sign-in. Comment or remove the line below if using the line above. -->\r\n' +
        '|        <Item Key="ValidTokenIssuerPrefixes">https://sts.windows.net/</Item>\r\n' +
        '|      </Metadata>\r\n' +
        '|      <CryptographicKeys>\r\n' +
        '|        <!-- Make sure to update the reference ID of the client secret below you just created (B2C_1A_AADAppSecret) -->\r\n' +
        '|        <Key Id="client_secret" StorageReferenceId="B2C_1A_AADAppSecret" />\r\n' +
        '|      </CryptographicKeys>\r\n' +
        '|      <OutputClaims>\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="authenticationSource" DefaultValue="socialIdpAuthentication" />\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="identityProvider" PartnerClaimType="iss" />\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="socialIdpUserId" PartnerClaimType="sub" />\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="displayName" PartnerClaimType="name" />\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="givenName" PartnerClaimType="given_name" />\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="surName" PartnerClaimType="family_name" />\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="email" />\r\n' +
        '|      </OutputClaims>\r\n' +
        '|      <OutputClaimsTransformations>\r\n' +
        '|        <OutputClaimsTransformation ReferenceId="CreateRandomUPNUserName" />\r\n' +
        '|        <OutputClaimsTransformation ReferenceId="CreateUserPrincipalName" />\r\n' +
        '|        <OutputClaimsTransformation ReferenceId="CreateAlternativeSecurityId" />\r\n' +
        '|        <OutputClaimsTransformation ReferenceId="CreateSubjectClaimFromAlternativeSecurityId" />\r\n' +
        '|      </OutputClaimsTransformations>\r\n' +
        '|      <UseTechnicalProfileForSessionManagement ReferenceId="SM-SocialLogin" />\r\n' +
        '|    </TechnicalProfile>\r\n' +
        '|  </TechnicalProfiles>\r\n' +
        '|</ClaimsProvider>\r\n';

    static TP_IDP_Facebook: string = 
        '|<ClaimsProvider>\r\n' +
        '|  <Domain>facebook.com</Domain>\r\n' +
        '|  <DisplayName>Facebook</DisplayName>\r\n' +
        '|  <TechnicalProfiles>\r\n' +
        '|    <TechnicalProfile Id="Facebook-OAUTH">\r\n' +
        '|      <DisplayName>Facebook</DisplayName>\r\n' +
        '|      <Protocol Name="OAuth2" />\r\n' +
        '|      <Metadata>\r\n' +
        '|        <Item Key="ProviderName">facebook</Item>\r\n' +
        '|        <Item Key="authorization_endpoint">https://www.facebook.com/dialog/oauth</Item>\r\n' +
        '|        <Item Key="AccessTokenEndpoint">https://graph.facebook.com/oauth/access_token</Item>\r\n' +
        '|        <Item Key="HttpBinding">GET</Item>\r\n' +
        '|        <Item Key="UsePolicyInRedirectUri">0</Item>\r\n' +
        '|        <!-- The Facebook required HTTP GET method, but the access token response is in JSON format from 3/27/2017 -->\r\n' +
        '|        <Item Key="AccessTokenResponseFormat">json</Item>\r\n' +
        '|        <Item Key="client_id">facebook_clientid</Item>\r\n' +
        '|        <Item Key="scope">email public_profile</Item>\r\n' +
        '|        <Item Key="ClaimsEndpoint">https://graph.facebook.com/me?fields=id,first_name,last_name,name,email</Item>\r\n' +
        '|      </Metadata>\r\n' +
        '|      <CryptographicKeys>\r\n' +
        '|        <Key Id="client_secret" StorageReferenceId="B2C_1A_FacebookSecret" />\r\n' +
        '|      </CryptographicKeys>\r\n' +
        '|      <InputClaims />\r\n' +
        '|      <OutputClaims>\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="socialIdpUserId" PartnerClaimType="id" />\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="givenName" PartnerClaimType="first_name" />\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="surname" PartnerClaimType="last_name" />\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="displayName" PartnerClaimType="name" />\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="email" PartnerClaimType="email" />\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="identityProvider" DefaultValue="facebook.com" />\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="authenticationSource" DefaultValue="socialIdpAuthentication" />\r\n' +
        '|      </OutputClaims>\r\n' +
        '|      <OutputClaimsTransformations>\r\n' +
        '|        <OutputClaimsTransformation ReferenceId="CreateRandomUPNUserName" />\r\n' +
        '|        <OutputClaimsTransformation ReferenceId="CreateUserPrincipalName" />\r\n' +
        '|        <OutputClaimsTransformation ReferenceId="CreateAlternativeSecurityId" />\r\n' +
        '|      </OutputClaimsTransformations>\r\n' +
        '|      <UseTechnicalProfileForSessionManagement ReferenceId="SM-SocialLogin" />\r\n' +
        '|    </TechnicalProfile>\r\n' +
        '|  </TechnicalProfiles>\r\n' +
        '|</ClaimsProvider>\r\n';

    static TP_IDP_LinkeIn: string = 
        '|<ClaimsProvider>\r\n' +
        '|  <Domain>linkedin.com</Domain>\r\n' +
        '|  <DisplayName>LinkedIn</DisplayName>\r\n' +
        '|  <TechnicalProfiles>\r\n' +
        '|    <TechnicalProfile Id="LinkedIn-OAUTH">\r\n' +
        '|      <DisplayName>LinkedIn</DisplayName>\r\n' +
        '|      <Protocol Name="OAuth2" />\r\n' +
        '|      <Metadata>\r\n' +
        '|        <Item Key="ProviderName">linkedin</Item>\r\n' +
        '|        <Item Key="authorization_endpoint">https://www.linkedin.com/oauth/v2/authorization</Item>\r\n' +
        '|        <Item Key="AccessTokenEndpoint">https://www.linkedin.com/oauth/v2/accessToken</Item>\r\n' +
        '|        <Item Key="ClaimsEndpoint">https://api.linkedin.com/v1/people/~:(id,first-name,last-name,email-address,headline)</Item>\r\n' +
        '|        <Item Key="ClaimsEndpointAccessTokenName">oauth2_access_token</Item>\r\n' +
        '|        <Item Key="ClaimsEndpointFormatName">format</Item>\r\n' +
        '|        <Item Key="ClaimsEndpointFormat">json</Item>\r\n' +
        '|        <Item Key="scope">r_emailaddress r_basicprofile</Item>\r\n' +
        '|        <Item Key="HttpBinding">POST</Item>\r\n' +
        '|        <Item Key="UsePolicyInRedirectUri">0</Item>\r\n' +
        '|        <Item Key="client_id">Your LinkedIn application client ID</Item>\r\n' +
        '|      </Metadata>\r\n' +
        '|      <CryptographicKeys>\r\n' +
        '|        <Key Id="client_secret" StorageReferenceId="B2C_1A_LinkedInSecret" />\r\n' +
        '|      </CryptographicKeys>\r\n' +
        '|      <OutputClaims>\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="socialIdpUserId" PartnerClaimType="id" />\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="givenName" PartnerClaimType="firstName" />\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="surname" PartnerClaimType="lastName" />\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="email" PartnerClaimType="emailAddress" />\r\n' +
        '|        <!--<OutputClaim ClaimTypeReferenceId="jobTitle" PartnerClaimType="headline" />-->\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="identityProvider" DefaultValue="linkedin.com" />\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="authenticationSource" DefaultValue="socialIdpAuthentication" />\r\n' +
        '|      </OutputClaims>\r\n' +
        '|      <OutputClaimsTransformations>\r\n' +
        '|        <OutputClaimsTransformation ReferenceId="CreateRandomUPNUserName" />\r\n' +
        '|        <OutputClaimsTransformation ReferenceId="CreateUserPrincipalName" />\r\n' +
        '|        <OutputClaimsTransformation ReferenceId="CreateAlternativeSecurityId" />\r\n' +
        '|        <OutputClaimsTransformation ReferenceId="CreateSubjectClaimFromAlternativeSecurityId" />\r\n' +
        '|      </OutputClaimsTransformations>\r\n' +
        '|      <UseTechnicalProfileForSessionManagement ReferenceId="SM-SocialLogin" />\r\n' +
        '|    </TechnicalProfile>\r\n' +
        '|  </TechnicalProfiles>\r\n' +
        '|</ClaimsProvider>\r\n';

    static TP_IDP_Twitter: string = 
        '|<ClaimsProvider>\r\n' +
        '|  <Domain>twitter.com</Domain>\r\n' +
        '|  <DisplayName>Twitter</DisplayName>\r\n' +
        '|  <TechnicalProfiles>\r\n' +
        '|    <TechnicalProfile Id="Twitter-OAUTH1">\r\n' +
        '|      <DisplayName>Twitter</DisplayName>\r\n' +
        '|      <Protocol Name="OAuth1" />\r\n' +
        '|      <Metadata>\r\n' +
        '|        <Item Key="ProviderName">Twitter</Item>\r\n' +
        '|        <Item Key="authorization_endpoint">https://api.twitter.com/oauth/authenticate</Item>\r\n' +
        '|        <Item Key="access_token_endpoint">https://api.twitter.com/oauth/access_token</Item>\r\n' +
        '|        <Item Key="request_token_endpoint">https://api.twitter.com/oauth/request_token</Item>\r\n' +
        '|        <Item Key="ClaimsEndpoint">https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true</Item>\r\n' +
        '|        <Item Key="ClaimsResponseFormat">json</Item>\r\n' +
        '|        <Item Key="client_id">Your Twitter application consumer key</Item>\r\n' +
        '|      </Metadata>\r\n' +
        '|      <CryptographicKeys>\r\n' +
        '|        <Key Id="client_secret" StorageReferenceId="B2C_1A_TwitterSecret" />\r\n' +
        '|      </CryptographicKeys>\r\n' +
        '|      <InputClaims />\r\n' +
        '|      <OutputClaims>\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="socialIdpUserId" PartnerClaimType="user_id" />\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="displayName" PartnerClaimType="screen_name" />\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="email" />\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="identityProvider" DefaultValue="twitter.com" />\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="authenticationSource" DefaultValue="socialIdpAuthentication" />\r\n' +
        '|      </OutputClaims>\r\n' +
        '|      <OutputClaimsTransformations>\r\n' +
        '|        <OutputClaimsTransformation ReferenceId="CreateRandomUPNUserName" />\r\n' +
        '|        <OutputClaimsTransformation ReferenceId="CreateUserPrincipalName" />\r\n' +
        '|        <OutputClaimsTransformation ReferenceId="CreateAlternativeSecurityId" />\r\n' +
        '|        <OutputClaimsTransformation ReferenceId="CreateSubjectClaimFromAlternativeSecurityId" />\r\n' +
        '|      </OutputClaimsTransformations>\r\n' +
        '|      <UseTechnicalProfileForSessionManagement ReferenceId="SM-SocialLogin" />\r\n' +
        '|    </TechnicalProfile>\r\n' +
        '|  </TechnicalProfiles>\r\n' +
        '|</ClaimsProvider>\r\n';

    static TP_IDP_ADFS: string = 
        '|<ClaimsProvider>\r\n' +
        '|  <Domain>contoso.com</Domain>\r\n' +
        '|  <DisplayName>Contoso ADFS</DisplayName>\r\n' +
        '|  <TechnicalProfiles>\r\n' +
        '|    <TechnicalProfile Id="Contoso-SAML2">\r\n' +
        '|      <DisplayName>Contoso ADFS</DisplayName>\r\n' +
        '|      <Description>Login with your Contoso account</Description>\r\n' +
        '|      <Protocol Name="SAML2"/>\r\n' +
        '|      <Metadata>\r\n' +
        '|        <Item Key="RequestsSigned">false</Item>\r\n' +
        '|        <Item Key="WantsEncryptedAssertions">false</Item>\r\n' +
        '|        <Item Key="PartnerEntity">https://{your_ADFS_domain}/federationmetadata/2007-06/federationmetadata.xml</Item>\r\n' +
        '|      </Metadata>\r\n' +
        '|      <CryptographicKeys>\r\n' +
        '|        <Key Id="SamlAssertionSigning" StorageReferenceId="B2C_1A_ADFSSamlCert"/>\r\n' +
        '|        <Key Id="SamlMessageSigning" StorageReferenceId="B2C_1A_ADFSSamlCert"/>\r\n' +
        '|      </CryptographicKeys>\r\n' +
        '|      <OutputClaims>\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="socialIdpUserId" PartnerClaimType="userPrincipalName" />\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="givenName" PartnerClaimType="given_name"/>\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="surname" PartnerClaimType="family_name"/>\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="email" PartnerClaimType="email"/>\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="displayName" PartnerClaimType="name"/>\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="identityProvider" DefaultValue="contoso.com" />\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="authenticationSource" DefaultValue="socialIdpAuthentication"/>\r\n' +
        '|      </OutputClaims>\r\n' +
        '|        <OutputClaimsTransformations>\r\n' +
        '|        <OutputClaimsTransformation ReferenceId="CreateRandomUPNUserName"/>\r\n' +
        '|        <OutputClaimsTransformation ReferenceId="CreateUserPrincipalName"/>\r\n' +
        '|        <OutputClaimsTransformation ReferenceId="CreateAlternativeSecurityId"/>\r\n' +
        '|      <OutputClaimsTransformation ReferenceId="CreateSubjectClaimFromAlternativeSecurityId"/>\r\n' +
        '|      </OutputClaimsTransformations>\r\n' +
        '|      <UseTechnicalProfileForSessionManagement ReferenceId="SM-Noop"/>\r\n' +
        '|    </TechnicalProfile>\r\n' +
        '|  </TechnicalProfiles>\r\n' +
        '|</ClaimsProvider>\r\n';

    static TP_IDP_Saleforce: string = 
        '|<ClaimsProvider>\r\n' +
        '|  <Domain>salesforce</Domain>\r\n' +
        '|  <DisplayName>Salesforce</DisplayName>\r\n' +
        '|  <TechnicalProfiles>\r\n' +
        '|    <TechnicalProfile Id="salesforce">\r\n' +
        '|      <DisplayName>Salesforce</DisplayName>\r\n' +
        '|      <Description>Login with your Salesforce account</Description>\r\n' +
        '|      <Protocol Name="SAML2"/>\r\n' +
        '|      <Metadata>\r\n' +
        '|        <Item Key="RequestsSigned">false</Item>\r\n' +
        '|        <Item Key="WantsEncryptedAssertions">false</Item>\r\n' +
        '|        <Item Key="WantsSignedAssertions">false</Item>\r\n' +
        '|        <Item Key="PartnerEntity">https://contoso-dev-ed.my.salesforce.com/.well-known/samlidp.xml</Item>\r\n' +
        '|      </Metadata>\r\n' +
        '|      <CryptographicKeys>\r\n' +
        '|        <Key Id="SamlAssertionSigning" StorageReferenceId="B2C_1A_SAMLSigningCert"/>\r\n' +
        '|        <Key Id="SamlMessageSigning" StorageReferenceId="B2C_1A_SAMLSigningCert"/>\r\n' +
        '|      </CryptographicKeys>\r\n' +
        '|      <OutputClaims>\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="socialIdpUserId" PartnerClaimType="userId"/>\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="givenName" PartnerClaimType="given_name"/>\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="surname" PartnerClaimType="family_name"/>\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="email" PartnerClaimType="email"/>\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="displayName" PartnerClaimType="username"/>\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="authenticationSource" DefaultValue="externalIdp"/>\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="identityProvider" DefaultValue="SAMLIdp" />\r\n' +
        '|      </OutputClaims>\r\n' +
        '|      <OutputClaimsTransformations>\r\n' +
        '|        <OutputClaimsTransformation ReferenceId="CreateRandomUPNUserName"/>\r\n' +
        '|        <OutputClaimsTransformation ReferenceId="CreateUserPrincipalName"/>\r\n' +
        '|        <OutputClaimsTransformation ReferenceId="CreateAlternativeSecurityId"/>\r\n' +
        '|        <OutputClaimsTransformation ReferenceId="CreateSubjectClaimFromAlternativeSecurityId"/>\r\n' +
        '|      </OutputClaimsTransformations>\r\n' +
        '|      <UseTechnicalProfileForSessionManagement ReferenceId="SM-Noop"/>\r\n' +
        '|    </TechnicalProfile>\r\n' +
        '|  </TechnicalProfiles>\r\n' +
        '|</ClaimsProvider>\r\n';

    static TP_IDP_Amazon: string = 
        '|<ClaimsProvider>\r\n' +
        '|  <Domain>amazon.com</Domain>\r\n' +
        '|  <DisplayName>Amazon</DisplayName>\r\n' +
        '|  <TechnicalProfiles>\r\n' +
        '|    <TechnicalProfile Id="Amazon-OAUTH">\r\n' +
        '|      <DisplayName>Amazon</DisplayName>\r\n' +
        '|      <Protocol Name="OAuth2" />\r\n' +
        '|      <Metadata>\r\n' +
        '|        <Item Key="ProviderName">amazon</Item>\r\n' +
        '|        <Item Key="authorization_endpoint">https://www.amazon.com/ap/oa</Item>\r\n' +
        '|        <Item Key="AccessTokenEndpoint">https://api.amazon.com/auth/o2/token</Item>\r\n' +
        '|        <Item Key="ClaimsEndpoint">https://api.amazon.com/user/profile</Item>\r\n' +
        '|        <Item Key="scope">profile</Item>\r\n' +
        '|        <Item Key="HttpBinding">POST</Item>\r\n' +
        '|        <Item Key="UsePolicyInRedirectUri">0</Item>\r\n' +
        '|        <Item Key="client_id">Your Amazon application client ID</Item>\r\n' +
        '|      </Metadata>\r\n' +
        '|      <CryptographicKeys>\r\n' +
        '|        <Key Id="client_secret" StorageReferenceId="B2C_1A_AmazonSecret" />\r\n' +
        '|      </CryptographicKeys>\r\n' +
        '|      <OutputClaims>\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="socialIdpUserId" PartnerClaimType="user_id" />\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="email" PartnerClaimType="email" />\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="displayName" PartnerClaimType="name" />\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="identityProvider" DefaultValue="amazon.com" />\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="authenticationSource" DefaultValue="socialIdpAuthentication" />\r\n' +
        '|      </OutputClaims>\r\n' +
        '|      <OutputClaimsTransformations>\r\n' +
        '|        <OutputClaimsTransformation ReferenceId="CreateRandomUPNUserName" />\r\n' +
        '|        <OutputClaimsTransformation ReferenceId="CreateUserPrincipalName" />\r\n' +
        '|        <OutputClaimsTransformation ReferenceId="CreateAlternativeSecurityId" />\r\n' +
        '|        <OutputClaimsTransformation ReferenceId="CreateSubjectClaimFromAlternativeSecurityId" />\r\n' +
        '|      </OutputClaimsTransformations>\r\n' +
        '|      <UseTechnicalProfileForSessionManagement ReferenceId="SM-SocialLogin" />\r\n' +
        '|    </TechnicalProfile>\r\n' +
        '|  </TechnicalProfiles>\r\n' +
        '|</ClaimsProvider>\r\n';

    static TP_IDP_VK: string = '  Not implemented yet\r\n';

    static TP_REST_None: string = 
        '|    <TechnicalProfile Id="{name}">\r\n' +
        '|      <DisplayName>Validate user input data and return loyaltyNumber claim</DisplayName>\r\n' +
        '|      <Protocol Name="Proprietary" Handler="Web.TPEngine.Providers.RestfulProvider, Web.TPEngine, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null" />\r\n' +
        '|      <Metadata>\r\n' +
        '|        <Item Key="ServiceUrl">{serviceUri}</Item>\r\n' +
        '|        <Item Key="AuthenticationType">None</Item>\r\n' +
        '|        <Item Key="SendClaimsIn">Body</Item>\r\n' +
        '|      </Metadata>\r\n' +
        '|      <InputClaims>\r\n' +
        '|        <InputClaim ClaimTypeReferenceId="email" />\r\n' +
        '|        <InputClaim ClaimTypeReferenceId="givenName" PartnerClaimType="firstName" />\r\n' +
        '|        <InputClaim ClaimTypeReferenceId="surname" PartnerClaimType="lastName" />\r\n' +
        '|      </InputClaims>\r\n' +
        '|      <OutputClaims>\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="loyaltyNumber" PartnerClaimType="loyaltyNumber" />\r\n' +
        '|      </OutputClaims>\r\n' +
        '|      <UseTechnicalProfileForSessionManagement ReferenceId="SM-Noop" />\r\n' +
        '|    </TechnicalProfile>\r\n';

    static TP_REST_Basic: string = 
        '|    <TechnicalProfile Id="{name}">\r\n' +
        '|      <DisplayName>Validate user input data and return loyaltyNumber claim</DisplayName>\r\n' +
        '|      <Protocol Name="Proprietary" Handler="Web.TPEngine.Providers.RestfulProvider, Web.TPEngine, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null" />\r\n' +
        '|      <Metadata>\r\n' +
        '|        <Item Key="ServiceUrl">{serviceUri}</Item>\r\n' +
        '|        <Item Key="AuthenticationType">Basic</Item>\r\n' +
        '|        <Item Key="SendClaimsIn">Body</Item>\r\n' +
        '|      </Metadata>\r\n' +
        '|      <CryptographicKeys>\r\n' +
        '|        <Key Id="BasicAuthenticationUsername" StorageReferenceId="B2C_1A_B2cRestClientId" />\r\n' +
        '|        <Key Id="BasicAuthenticationPassword" StorageReferenceId="B2C_1A_B2cRestClientSecret" />\r\n' +
        '|      </CryptographicKeys>\r\n' +
        '|      <InputClaims>\r\n' +
        '|        <InputClaim ClaimTypeReferenceId="email" />\r\n' +
        '|        <InputClaim ClaimTypeReferenceId="givenName" PartnerClaimType="firstName" />\r\n' +
        '|        <InputClaim ClaimTypeReferenceId="surname" PartnerClaimType="lastName" />\r\n' +
        '|      </InputClaims>\r\n' +
        '|      <OutputClaims>\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="loyaltyNumber" PartnerClaimType="loyaltyNumber" />\r\n' +
        '|      </OutputClaims>\r\n' +
        '|      <UseTechnicalProfileForSessionManagement ReferenceId="SM-Noop" />\r\n' +
        '|    </TechnicalProfile>\r\n';

    static TP_REST_ClientCertificate: string = 
        '|    <TechnicalProfile Id="{name}">\r\n' +
        '|      <DisplayName>Validate user input data and return loyaltyNumber claim</DisplayName>\r\n' +
        '|      <Protocol Name="Proprietary" Handler="Web.TPEngine.Providers.RestfulProvider, Web.TPEngine, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null" />\r\n' +
        '|      <Metadata>\r\n' +
        '|        <Item Key="ServiceUrl">{serviceUri}</Item>\r\n' +
        '|        <Item Key="AuthenticationType">ClientCertificate</Item>\r\n' +
        '|        <Item Key="SendClaimsIn">Body</Item>\r\n' +
        '|      </Metadata>\r\n' +
        '|      <CryptographicKeys>\r\n' +
        '|        <Key Id="ClientCertificate" StorageReferenceId="B2C_1A_B2cRestClientCertificate" />\r\n' +
        '|      </CryptographicKeys>\r\n' +
        '|      <InputClaims>\r\n' +
        '|        <InputClaim ClaimTypeReferenceId="email" />\r\n' +
        '|        <InputClaim ClaimTypeReferenceId="givenName" PartnerClaimType="firstName" />\r\n' +
        '|        <InputClaim ClaimTypeReferenceId="surname" PartnerClaimType="lastName" />\r\n' +
        '|      </InputClaims>\r\n' +
        '|      <OutputClaims>\r\n' +
        '|        <OutputClaim ClaimTypeReferenceId="loyaltyNumber" PartnerClaimType="loyaltyNumber" />\r\n' +
        '|        </OutputClaims>\r\n' +
        '|      <UseTechnicalProfileForSessionManagement ReferenceId="SM-Noop" />\r\n' +
        '|    </TechnicalProfile>\r\n';


    static CLAIM_TextBox: string =
        '|<ClaimType Id="{name}">\r\n' +
        '|  <DisplayName>{displayName}</DisplayName>\r\n' +
        '|  <DataType>string</DataType>\r\n' +
        '|  <UserHelpText>Add help text here</UserHelpText>\r\n' +
        '|  <UserInputType>TextBox</UserInputType>\r\n' +
        '|</ClaimType>\r\n';

    static CLAIM_RadioSingleSelect: string =
        '|<ClaimType Id="{name}">\r\n' +
        '|	 <DisplayName>{displayName}</DisplayName>\r\n' +
        '|	 <DataType>string</DataType>\r\n' +
        '|  <UserHelpText>Add help text here</UserHelpText>\r\n' +
        '|	 <UserInputType>RadioSingleSelect</UserInputType>\r\n' +
        '|	 <Restriction>\r\n' +
        '|		<Enumeration Text="Bellevue" Value="bellevue" SelectByDefault="false" />\r\n' +
        '|		<Enumeration Text="Redmond" Value="redmond" SelectByDefault="false" />\r\n' +
        '|		<Enumeration Text="Kirkland" Value="kirkland" SelectByDefault="false" />\r\n' +
        '|	 </Restriction>\r\n' +
        '|</ClaimType>\r\n';

    static CLAIM_DropdownSingleSelect: string =
        '|<ClaimType Id="{name}">\r\n' +
        '|  <DisplayName>{displayName}</DisplayName>\r\n' +
        '|  <DataType>string</DataType>\r\n' +
        '|  <UserHelpText>Add help text here</UserHelpText>\r\n' +
        '|  <UserInputType>DropdownSingleSelect</UserInputType>\r\n' +
        '|  <Restriction>\r\n' +
        '|    <Enumeration Text="Bellevue" Value="bellevue" SelectByDefault="false" />\r\n' +
        '|    <Enumeration Text="Redmond" Value="redmond" SelectByDefault="false" />\r\n' +
        '|    <Enumeration Text="Kirkland" Value="kirkland" SelectByDefault="false" />\r\n' +
        '|  </Restriction>\r\n' +
        '|</ClaimType>\r\n';

    static CLAIM_CheckboxMultiSelect: string =
        '|<ClaimType Id="{name}">\r\n' +
        '|  <DisplayName>{displayName}</DisplayName>\r\n' +
        '|  <DataType>string</DataType>\r\n' +
        '|  <UserHelpText>Add help text here</UserHelpText>\r\n' +
        '|  <UserInputType>CheckboxMultiSelect</UserInputType>\r\n' +
        '|  <Restriction>\r\n' +
        '|    <Enumeration Text="Bellevue" Value="bellevue" SelectByDefault="false" />\r\n' +
        '|    <Enumeration Text="Redmond" Value="redmond" SelectByDefault="false" />\r\n' +
        '|    <Enumeration Text="Kirkland" Value="kirkland" SelectByDefault="false" />\r\n' +
        '|  </Restriction>\r\n' +
        '|</ClaimType>\r\n';

    static CLAIM_DateTimeDropdown: string =
        '|<ClaimType Id="{name}">\r\n' +
        '| <DisplayName>{displayName}</DisplayName>\r\n' +
        '| <DataType>date</DataType>\r\n' +
        '| <UserHelpText>Add help text here</UserHelpText>\r\n' +
        '| <UserInputType>DateTimeDropdown</UserInputType>\r\n' +
        '|</ClaimType>\r\n';

    static CLAIM_Readonly: string =
        '|<ClaimType Id="{name}">\r\n' +
        '|	<DisplayName>{displayName}</DisplayName>\r\n' +
        '|	<DataType>string</DataType>\r\n' +
        '|  <UserHelpText>Add help text here</UserHelpText>\r\n' +
        '|	<UserInputType>Readonly</UserInputType>\r\n' +
        '|</ClaimType>\r\n';

    static CLAIM_Paragraph: string =
        '|<ClaimType Id="{name}">\r\n' +
        '|	<DisplayName>{displayName}</DisplayName>\r\n' +
        '|	<DataType>string</DataType>\r\n' +
        '|  <UserHelpText>Add help text here</UserHelpText>\r\n' +
        '|	<UserInputType>Paragraph</UserInputType>\r\n' +
        '|</ClaimType>\r\n';

    static CLAIM_String: string =
        '|<ClaimType Id="{name}">\r\n' +
        '|  <DisplayName>{displayName}</DisplayName>\r\n' +
        '|  <DataType>string</DataType>\r\n' +
        '|	<AdminHelpText>Add help text here</AdminHelpText>\r\n' +
        '|</ClaimType>\r\n';

    static CLAIM_stringCollection: string =
        '|<ClaimType Id="{name}">\r\n' +
        '|	<DisplayName>{displayName}</DisplayName>\r\n' +
        '|	<DataType>stringCollection</DataType>\r\n' +
        '|	<AdminHelpText>Add help text here</AdminHelpText>\r\n' +
        '|</ClaimType>\r\n';


    static CLAIM_Boolean: string =
        '|<ClaimType Id="{name}">\r\n' +
        '|	<DisplayName>{displayName}</DisplayName>\r\n' +
        '|	<DataType>boolean</DataType>\r\n' +
        '|	<AdminHelpText>Add help text here</AdminHelpText>\r\n' +
        '|</ClaimType>\r\n';


    static CLAIM_Integer: string =
        '|<ClaimType Id="{name}">\r\n' +
        '|	<DisplayName>{displayName}</DisplayName>\r\n' +
        '|	<DataType>int</DataType>\r\n' +
        '|	<AdminHelpText>Add help text here</AdminHelpText>\r\n' +
        '|</ClaimType>\r\n';

    static CLAIM_Long: string =
        '|<ClaimType Id="{name}">\r\n' +
        '|	<DisplayName>{displayName}</DisplayName>\r\n' +
        '|	<DataType>long</DataType>\r\n' +
        '|	<AdminHelpText>Add help text here</AdminHelpText>\r\n' +
        '|</ClaimType>\r\n';

    static ApplicationInsightsDebugMode: string =
        '  <!--Step 1: Add the following attributes to the <TrustFrameworkPolicy> element\r\n' +
        '  DeploymentMode="Development"\r\n' +
        '  UserJourneyRecorderEndpoint="urn:journeyrecorder:applicationinsights"\r\n' +
        '  -->\r\n' +
        '\r\n' +
        '  <!--Step 2: Add the following node immediately after the DefaultUserJourney element-->\r\n' +
        '  <UserJourneyBehaviors>\r\n' +
        '  	<JourneyInsights TelemetryEngine="ApplicationInsights" InstrumentationKey="{instrumentationKey}" DeveloperMode="true" ClientEnabled="false" ServerEnabled="true" TelemetryVersion="1.0.0" />\r\n' +
        '  </UserJourneyBehaviors>\r\n';


    static DefaultDeploymentSettings: string = `
{
    "Environments": [
        {
            "Name": "Development",
            "Production": false,
            "Tenant": "your-dev-tenant.onmicrosoft.com",
            "PolicySettings" : {
                "ProxyIdentityExperienceFrameworkAppId": "Your dev environment AD Proxy app Id",
                "FacebookAppId": "0"
            }
        },
        {
            "Name": "Test",
            "Production": false,
            "Tenant": "your-test-tenant.onmicrosoft.com",
            "PolicySettings" : {
                "ProxyIdentityExperienceFrameworkAppId": "Your AD test environment Proxy app Id",
                "FacebookAppId": "0"
            }
        },
        {
            "Name": "QA",
            "Production": false,
            "Tenant": "your-qa-tenant.onmicrosoft.com",
            "PolicySettings" : {
                "ProxyIdentityExperienceFrameworkAppId": "Your QA environment AD Proxy app Id",
                "FacebookAppId": "0"
            }
        },
        {
            "Name": "Production",
            "Production": true,
            "Tenant": "your-production-tenant.onmicrosoft.com",
            "PolicySettings" : {
                "ProxyIdentityExperienceFrameworkAppId": "Your production environment AD Proxy app Id",
                "FacebookAppId": "0"
            }
        }
    ]
}`;
}


