
export default class Consts {
    static TP_IDP_Microsoft: string = '\t<ClaimsProvider>\r\n' +
        '\t<Domain>live.com</Domain>\r\n' +
        '\t<DisplayName>Microsoft Account</DisplayName>\r\n' +
        '\t<TechnicalProfiles>\r\n' +
        '\t<TechnicalProfile Id="MSA-OIDC">\r\n' +
        '\t    <DisplayName>Microsoft Account</DisplayName>\r\n' +
        '\t    <Protocol Name="OpenIdConnect" />\r\n' +
        '\t    <Metadata>\r\n' +
        '\t    <Item Key="ProviderName">https://login.live.com</Item>\r\n' +
        '\t    <Item Key="METADATA">https://login.live.com/.well-known/openid-configuration</Item>\r\n' +
        '\t    <Item Key="response_types">code</Item>\r\n' +
        '\t    <Item Key="response_mode">form_post</Item>\r\n' +
        '\t    <Item Key="scope">openid profile email</Item>\r\n' +
        '\t    <Item Key="HttpBinding">POST</Item>\r\n' +
        '\t    <Item Key="UsePolicyInRedirectUri">0</Item>\r\n' +
        '\t    <Item Key="client_id">Your Microsoft application client id</Item>\r\n' +
        '\t    </Metadata>\r\n' +
        '\t<CryptographicKeys>\r\n' +
        '\t    <Key Id="client_secret" StorageReferenceId="B2C_1A_MSASecret" />\r\n' +
        '\t</CryptographicKeys>\r\n' +
        '\t<OutputClaims>\r\n' +
        '\t    <OutputClaim ClaimTypeReferenceId="identityProvider" DefaultValue="live.com" />\r\n' +
        '\t    <OutputClaim ClaimTypeReferenceId="authenticationSource" DefaultValue="socialIdpAuthentication" />\r\n' +
        '\t    <OutputClaim ClaimTypeReferenceId="socialIdpUserId" PartnerClaimType="sub" />\r\n' +
        '\t    <OutputClaim ClaimTypeReferenceId="displayName" PartnerClaimType="name" />\r\n' +
        '\t    <OutputClaim ClaimTypeReferenceId="email" />\r\n' +
        '\t    </OutputClaims>\r\n' +
        '\t    <OutputClaimsTransformations>\r\n' +
        '\t    <OutputClaimsTransformation ReferenceId="CreateRandomUPNUserName" />\r\n' +
        '\t    <OutputClaimsTransformation ReferenceId="CreateUserPrincipalName" />\r\n' +
        '\t    <OutputClaimsTransformation ReferenceId="CreateAlternativeSecurityId" />\r\n' +
        '\t    <OutputClaimsTransformation ReferenceId="CreateSubjectClaimFromAlternativeSecurityId" />\r\n' +
        '\t    </OutputClaimsTransformations>\r\n' +
        '\t    <UseTechnicalProfileForSessionManagement ReferenceId="SM-SocialLogin" />\r\n' +
        '\t</TechnicalProfile>\r\n' +
        '\t</TechnicalProfiles>\r\n' +
        '\t</ClaimsProvider>';

    static TP_IDP_Google: string = '\t<ClaimsProvider>\r\n' +
        '\t    <Domain>google.com</Domain>\r\n' +
        '\t    <DisplayName>Google</DisplayName>\r\n' +
        '\t    <TechnicalProfiles>\r\n' +
        '\t    <TechnicalProfile Id="Google-OAUTH">\r\n' +
        '\t        <DisplayName>Google</DisplayName>\r\n' +
        '\t        <Protocol Name="OAuth2" />\r\n' +
        '\t        <Metadata>\r\n' +
        '\t        <Item Key="ProviderName">google</Item>\r\n' +
        '\t        <Item Key="authorization_endpoint">https://accounts.google.com/o/oauth2/auth</Item>\r\n' +
        '\t        <Item Key="AccessTokenEndpoint">https://accounts.google.com/o/oauth2/token</Item>\r\n' +
        '\t        <Item Key="ClaimsEndpoint">https://www.googleapis.com/oauth2/v1/userinfo</Item>\r\n' +
        '\t        <Item Key="scope">email</Item>\r\n' +
        '\t        <Item Key="HttpBinding">POST</Item>\r\n' +
        '\t        <Item Key="UsePolicyInRedirectUri">0</Item>\r\n' +
        '\t        <Item Key="client_id">Your Google+ application ID</Item>\r\n' +
        '\t        </Metadata>\r\n' +
        '\t        <CryptographicKeys>\r\n' +
        '\t        <Key Id="client_secret" StorageReferenceId="B2C_1A_GoogleSecret" />\r\n' +
        '\t        </CryptographicKeys>\r\n' +
        '\t        <OutputClaims>\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="socialIdpUserId" PartnerClaimType="id" />\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="email" PartnerClaimType="email" />\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="givenName" PartnerClaimType="given_name" />\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="surname" PartnerClaimType="family_name" />\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="displayName" PartnerClaimType="name" />\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="identityProvider" DefaultValue="google.com" />\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="authenticationSource" DefaultValue="socialIdpAuthentication" />\r\n' +
        '\t        </OutputClaims>\r\n' +
        '\t        <OutputClaimsTransformations>\r\n' +
        '\t        <OutputClaimsTransformation ReferenceId="CreateRandomUPNUserName" />\r\n' +
        '\t        <OutputClaimsTransformation ReferenceId="CreateUserPrincipalName" />\r\n' +
        '\t        <OutputClaimsTransformation ReferenceId="CreateAlternativeSecurityId" />\r\n' +
        '\t        <OutputClaimsTransformation ReferenceId="CreateSubjectClaimFromAlternativeSecurityId" />\r\n' +
        '\t        </OutputClaimsTransformations>\r\n' +
        '\t        <UseTechnicalProfileForSessionManagement ReferenceId="SM-SocialLogin" />\r\n' +
        '\t        <ErrorHandlers>\r\n' +
        '\t        <ErrorHandler>\r\n' +
        '\t            <ErrorResponseFormat>json</ErrorResponseFormat>\r\n' +
        '\t            <ResponseMatch>$[?(@@.error == \'invalid_grant\')]</ResponseMatch>\r\n' +
        '\t            <Action>Reauthenticate</Action>\r\n' +
        '\t            <!--In case of authorization code used error, we don\'t want the user to select his account again.-->\r\n' +
        '\t            <!--AdditionalRequestParameters Key="prompt">select_account</AdditionalRequestParameters-->\r\n' +
        '\t        </ErrorHandler>\r\n' +
        '\t        </ErrorHandlers>\r\n' +
        '\t    </TechnicalProfile>\r\n' +
        '\t    </TechnicalProfiles>\r\n' +
        '\t</ClaimsProvider>';

    static TP_IDP_AzureAD: string = '\t<ClaimsProvider>\r\n' +
        '\t    <Domain>Contoso</Domain>\r\n' +
        '\t    <DisplayName>Login using Contoso</DisplayName>\r\n' +
        '\t    <TechnicalProfiles>\r\n' +
        '\t        <TechnicalProfile Id="ContosoProfile">\r\n' +
        '\t            <DisplayName>Contoso Employee</DisplayName>\r\n' +
        '\t            <Description>Login with your Contoso account</Description>\r\n' +
        '\t            <Protocol Name="OpenIdConnect"/>\r\n' +
        '\t            <OutputTokenFormat>JWT</OutputTokenFormat>\r\n' +
        '\t            <Metadata>\r\n' +
        '\t                <Item Key="METADATA">https://login.windows.net/contoso.com/.well-known/openid-configuration</Item>\r\n' +
        '\t                <Item Key="ProviderName">https://sts.windows.net/00000000-0000-0000-0000-000000000000/</Item>\r\n' +
        '\t                <Item Key="client_id">00000000-0000-0000-0000-000000000000</Item>\r\n' +
        '\t                <Item Key="IdTokenAudience">00000000-0000-0000-0000-000000000000</Item>\r\n' +
        '\t                <Item Key="response_types">id_token</Item>\r\n' +
        '\t                <Item Key="UsePolicyInRedirectUri">false</Item>\r\n' +
        '\t            </Metadata>\r\n' +
        '\t            <CryptographicKeys>\r\n' +
        '\t                <Key Id="client_secret" StorageReferenceId="B2C_1A_ContosoAppSecret"/>\r\n' +
        '\t            </CryptographicKeys>\r\n' +
        '\t            <OutputClaims>\r\n' +
        '\t                <OutputClaim ClaimTypeReferenceId="socialIdpUserId" PartnerClaimType="oid"/>\r\n' +
        '\t                <OutputClaim ClaimTypeReferenceId="tenantId" PartnerClaimType="tid"/>\r\n' +
        '\t                <OutputClaim ClaimTypeReferenceId="givenName" PartnerClaimType="given_name" />\r\n' +
        '\t                <OutputClaim ClaimTypeReferenceId="surName" PartnerClaimType="family_name" />\r\n' +
        '\t                <OutputClaim ClaimTypeReferenceId="displayName" PartnerClaimType="name" />\r\n' +
        '\t                <OutputClaim ClaimTypeReferenceId="authenticationSource" DefaultValue="contosoAuthentication" />\r\n' +
        '\t                <OutputClaim ClaimTypeReferenceId="identityProvider" DefaultValue="AzureADContoso" />\r\n' +
        '\t            </OutputClaims>\r\n' +
        '\t            <OutputClaimsTransformations>\r\n' +
        '\t                <OutputClaimsTransformation ReferenceId="CreateRandomUPNUserName"/>\r\n' +
        '\t                <OutputClaimsTransformation ReferenceId="CreateUserPrincipalName"/>\r\n' +
        '\t                <OutputClaimsTransformation ReferenceId="CreateAlternativeSecurityId"/>\r\n' +
        '\t                <OutputClaimsTransformation ReferenceId="CreateSubjectClaimFromAlternativeSecurityId"/>\r\n' +
        '\t            </OutputClaimsTransformations>\r\n' +
        '\t            <UseTechnicalProfileForSessionManagement ReferenceId="SM-Noop"/>\r\n' +
        '\t        </TechnicalProfile>\r\n' +
        '\t    </TechnicalProfiles>\r\n' +
        '\t</ClaimsProvider>';

    static TP_IDP_AzueADMulti: string = '\t<ClaimsProvider>\r\n' +
        '\t  <Domain>commonaad</Domain>\r\n' +
        '\t  <DisplayName>Common AAD</DisplayName>\r\n' +
        '\t  <TechnicalProfiles>\r\n' +
        '\t    <TechnicalProfile Id="Common-AAD">\r\n' +
        '\t      <DisplayName>Multi-Tenant AAD</DisplayName>\r\n' +
        '\t      <Protocol Name="OpenIdConnect" />\r\n' +
        '\t      <Metadata>\r\n' +
        '\t        <!-- Update the Client ID below to the Application ID -->\r\n' +
        '\t        <Item Key="client_id">00000000-0000-0000-0000-000000000000</Item>\r\n' +
        '\t        <Item Key="UsePolicyInRedirectUri">0</Item>\r\n' +
        '\t        <Item Key="METADATA">https://login.microsoftonline.com/common/.well-known/openid-configuration</Item>\r\n' +
        '\t        <Item Key="response_types">code</Item>\r\n' +
        '\t        <Item Key="scope">openid</Item>\r\n' +
        '\t        <Item Key="response_mode">form_post</Item>\r\n' +
        '\t        <Item Key="HttpBinding">POST</Item>\r\n' +
        '\t        <Item Key="DiscoverMetadataByTokenIssuer">true</Item>\r\n' +
        '\r\n' +
        '\t        <!-- The key below allows you to specify each of the Azure AD tenants that can be used to sign in. If you would like only specific tenants to be able to sign in, uncomment the line below and update the GUIDs. -->\r\n' +
        '\t        <!-- <Item Key="ValidTokenIssuerPrefixes">https://sts.windows.net/00000000-0000-0000-0000-000000000000,https://sts.windows.net/11111111-1111-1111-1111-111111111111</Item> -->\r\n' +
        '\r\n' +
        '\t        <!-- The commented key below specifies that users from any tenant can sign-in. Comment or remove the line below if using the line above. -->\r\n' +
        '\t        <Item Key="ValidTokenIssuerPrefixes">https://sts.windows.net/</Item>\r\n' +
        '\t      </Metadata>\r\n' +
        '\t      <CryptographicKeys>\r\n' +
        '\t      <!-- Make sure to update the reference ID of the client secret below you just created (B2C_1A_AADAppSecret) -->\r\n' +
        '\t        <Key Id="client_secret" StorageReferenceId="B2C_1A_AADAppSecret" />\r\n' +
        '\t      </CryptographicKeys>\r\n' +
        '\t      <OutputClaims>\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="authenticationSource" DefaultValue="socialIdpAuthentication" />\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="identityProvider" PartnerClaimType="iss" />\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="socialIdpUserId" PartnerClaimType="sub" />\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="displayName" PartnerClaimType="name" />\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="givenName" PartnerClaimType="given_name" />\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="surName" PartnerClaimType="family_name" />\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="email" />\r\n' +
        '\t      </OutputClaims>\r\n' +
        '\t      <OutputClaimsTransformations>\r\n' +
        '\t        <OutputClaimsTransformation ReferenceId="CreateRandomUPNUserName" />\r\n' +
        '\t        <OutputClaimsTransformation ReferenceId="CreateUserPrincipalName" />\r\n' +
        '\t        <OutputClaimsTransformation ReferenceId="CreateAlternativeSecurityId" />\r\n' +
        '\t        <OutputClaimsTransformation ReferenceId="CreateSubjectClaimFromAlternativeSecurityId" />\r\n' +
        '\t      </OutputClaimsTransformations>\r\n' +
        '\t      <UseTechnicalProfileForSessionManagement ReferenceId="SM-SocialLogin" />\r\n' +
        '\t    </TechnicalProfile>\r\n' +
        '\t  </TechnicalProfiles>\r\n' +
        '\t</ClaimsProvider>\r\n';

    static TP_IDP_Facebook: string = '\t    <ClaimsProvider>\r\n' +
        '\t      <!-- The following Domain element allows this profile to be used if the request comes with domain_hint \r\n' +
        '\t           query string parameter, e.g. domain_hint=facebook.com  -->\r\n' +
        '\t      <Domain>facebook.com</Domain>\r\n' +
        '\t      <DisplayName>Facebook</DisplayName>\r\n' +
        '\t      <TechnicalProfiles>\r\n' +
        '\t        <TechnicalProfile Id="Facebook-OAUTH">\r\n' +
        '\t          <!-- The text in the following DisplayName element is shown to the user on the claims provider \r\n' +
        '\t               selection screen. -->\r\n' +
        '\t          <DisplayName>Facebook</DisplayName>\r\n' +
        '\t          <Protocol Name="OAuth2" />\r\n' +
        '\t          <Metadata>\r\n' +
        '\t            <Item Key="ProviderName">facebook</Item>\r\n' +
        '\t            <Item Key="authorization_endpoint">https://www.facebook.com/dialog/oauth</Item>\r\n' +
        '\t            <Item Key="AccessTokenEndpoint">https://graph.facebook.com/oauth/access_token</Item>\r\n' +
        '\t            <Item Key="HttpBinding">GET</Item>\r\n' +
        '\t            <Item Key="UsePolicyInRedirectUri">0</Item>\r\n' +
        '\t            <!-- The Facebook required HTTP GET method, but the access token response is in JSON format from 3/27/2017 -->\r\n' +
        '\t            <Item Key="AccessTokenResponseFormat">json</Item>\r\n' +
        '\t            <Item Key="client_id">facebook_clientid</Item>\r\n' +
        '\t            <Item Key="scope">email public_profile</Item>\r\n' +
        '\t            <Item Key="ClaimsEndpoint">https://graph.facebook.com/me?fields=id,first_name,last_name,name,email</Item>\r\n' +
        '\t          </Metadata>\r\n' +
        '\t          <CryptographicKeys>\r\n' +
        '\t            <Key Id="client_secret" StorageReferenceId="B2C_1A_FacebookSecret" />\r\n' +
        '\t          </CryptographicKeys>\r\n' +
        '\t          <InputClaims />\r\n' +
        '\t          <OutputClaims>\r\n' +
        '\t            <OutputClaim ClaimTypeReferenceId="socialIdpUserId" PartnerClaimType="id" />\r\n' +
        '\t            <OutputClaim ClaimTypeReferenceId="givenName" PartnerClaimType="first_name" />\r\n' +
        '\t            <OutputClaim ClaimTypeReferenceId="surname" PartnerClaimType="last_name" />\r\n' +
        '\t            <OutputClaim ClaimTypeReferenceId="displayName" PartnerClaimType="name" />\r\n' +
        '\t            <OutputClaim ClaimTypeReferenceId="email" PartnerClaimType="email" />\r\n' +
        '\t            <OutputClaim ClaimTypeReferenceId="identityProvider" DefaultValue="facebook.com" />\r\n' +
        '\t            <OutputClaim ClaimTypeReferenceId="authenticationSource" DefaultValue="socialIdpAuthentication" />\r\n' +
        '\t          </OutputClaims>\r\n' +
        '\t          <OutputClaimsTransformations>\r\n' +
        '\t            <OutputClaimsTransformation ReferenceId="CreateRandomUPNUserName" />\r\n' +
        '\t            <OutputClaimsTransformation ReferenceId="CreateUserPrincipalName" />\r\n' +
        '\t            <OutputClaimsTransformation ReferenceId="CreateAlternativeSecurityId" />\r\n' +
        '\t          </OutputClaimsTransformations>\r\n' +
        '\t          <UseTechnicalProfileForSessionManagement ReferenceId="SM-SocialLogin" />\r\n' +
        '\t        </TechnicalProfile>\r\n' +
        '\t      </TechnicalProfiles>\r\n' +
        '\t    </ClaimsProvider>\r\n';

    static TP_IDP_LinkeIn: string = '\t<ClaimsProvider>\r\n' +
        '\t  <Domain>linkedin.com</Domain>\r\n' +
        '\t  <DisplayName>LinkedIn</DisplayName>\r\n' +
        '\t  <TechnicalProfiles>\r\n' +
        '\t    <TechnicalProfile Id="LinkedIn-OAUTH">\r\n' +
        '\t      <DisplayName>LinkedIn</DisplayName>\r\n' +
        '\t      <Protocol Name="OAuth2" />\r\n' +
        '\t      <Metadata>\r\n' +
        '\t        <Item Key="ProviderName">linkedin</Item>\r\n' +
        '\t        <Item Key="authorization_endpoint">https://www.linkedin.com/oauth/v2/authorization</Item>\r\n' +
        '\t        <Item Key="AccessTokenEndpoint">https://www.linkedin.com/oauth/v2/accessToken</Item>\r\n' +
        '\t        <Item Key="ClaimsEndpoint">https://api.linkedin.com/v1/people/~:(id,first-name,last-name,email-address,headline)</Item>\r\n' +
        '\t        <Item Key="ClaimsEndpointAccessTokenName">oauth2_access_token</Item>\r\n' +
        '\t        <Item Key="ClaimsEndpointFormatName">format</Item>\r\n' +
        '\t        <Item Key="ClaimsEndpointFormat">json</Item>\r\n' +
        '\t        <Item Key="scope">r_emailaddress r_basicprofile</Item>\r\n' +
        '\t        <Item Key="HttpBinding">POST</Item>\r\n' +
        '\t        <Item Key="UsePolicyInRedirectUri">0</Item>\r\n' +
        '\t        <Item Key="client_id">Your LinkedIn application client ID</Item>\r\n' +
        '\t      </Metadata>\r\n' +
        '\t      <CryptographicKeys>\r\n' +
        '\t        <Key Id="client_secret" StorageReferenceId="B2C_1A_LinkedInSecret" />\r\n' +
        '\t      </CryptographicKeys>\r\n' +
        '\t      <OutputClaims>\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="socialIdpUserId" PartnerClaimType="id" />\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="givenName" PartnerClaimType="firstName" />\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="surname" PartnerClaimType="lastName" />\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="email" PartnerClaimType="emailAddress" />\r\n' +
        '\t        <!--<OutputClaim ClaimTypeReferenceId="jobTitle" PartnerClaimType="headline" />-->\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="identityProvider" DefaultValue="linkedin.com" />\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="authenticationSource" DefaultValue="socialIdpAuthentication" />\r\n' +
        '\t      </OutputClaims>\r\n' +
        '\t      <OutputClaimsTransformations>\r\n' +
        '\t        <OutputClaimsTransformation ReferenceId="CreateRandomUPNUserName" />\r\n' +
        '\t        <OutputClaimsTransformation ReferenceId="CreateUserPrincipalName" />\r\n' +
        '\t        <OutputClaimsTransformation ReferenceId="CreateAlternativeSecurityId" />\r\n' +
        '\t        <OutputClaimsTransformation ReferenceId="CreateSubjectClaimFromAlternativeSecurityId" />\r\n' +
        '\t      </OutputClaimsTransformations>\r\n' +
        '\t      <UseTechnicalProfileForSessionManagement ReferenceId="SM-SocialLogin" />\r\n' +
        '\t    </TechnicalProfile>\r\n' +
        '\t  </TechnicalProfiles>\r\n' +
        '\t</ClaimsProvider>\r\n';

    static TP_IDP_Twitter: string = '\t<ClaimsProvider>\r\n' +
        '\t    <Domain>twitter.com</Domain>\r\n' +
        '\t    <DisplayName>Twitter</DisplayName>\r\n' +
        '\t    <TechnicalProfiles>\r\n' +
        '\t    <TechnicalProfile Id="Twitter-OAUTH1">\r\n' +
        '\t        <DisplayName>Twitter</DisplayName>\r\n' +
        '\t        <Protocol Name="OAuth1" />\r\n' +
        '\t        <Metadata>\r\n' +
        '\t        <Item Key="ProviderName">Twitter</Item>\r\n' +
        '\t        <Item Key="authorization_endpoint">https://api.twitter.com/oauth/authenticate</Item>\r\n' +
        '\t        <Item Key="access_token_endpoint">https://api.twitter.com/oauth/access_token</Item>\r\n' +
        '\t        <Item Key="request_token_endpoint">https://api.twitter.com/oauth/request_token</Item>\r\n' +
        '\t        <Item Key="ClaimsEndpoint">https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true</Item>\r\n' +
        '\t        <Item Key="ClaimsResponseFormat">json</Item>\r\n' +
        '\t        <Item Key="client_id">Your Twitter application consumer key</Item>\r\n' +
        '\t        </Metadata>\r\n' +
        '\t        <CryptographicKeys>\r\n' +
        '\t        <Key Id="client_secret" StorageReferenceId="B2C_1A_TwitterSecret" />\r\n' +
        '\t        </CryptographicKeys>\r\n' +
        '\t        <InputClaims />\r\n' +
        '\t        <OutputClaims>\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="socialIdpUserId" PartnerClaimType="user_id" />\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="displayName" PartnerClaimType="screen_name" />\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="email" />\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="identityProvider" DefaultValue="twitter.com" />\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="authenticationSource" DefaultValue="socialIdpAuthentication" />\r\n' +
        '\t        </OutputClaims>\r\n' +
        '\t        <OutputClaimsTransformations>\r\n' +
        '\t        <OutputClaimsTransformation ReferenceId="CreateRandomUPNUserName" />\r\n' +
        '\t        <OutputClaimsTransformation ReferenceId="CreateUserPrincipalName" />\r\n' +
        '\t        <OutputClaimsTransformation ReferenceId="CreateAlternativeSecurityId" />\r\n' +
        '\t        <OutputClaimsTransformation ReferenceId="CreateSubjectClaimFromAlternativeSecurityId" />\r\n' +
        '\t        </OutputClaimsTransformations>\r\n' +
        '\t        <UseTechnicalProfileForSessionManagement ReferenceId="SM-SocialLogin" />\r\n' +
        '\t    </TechnicalProfile>\r\n' +
        '\t    </TechnicalProfiles>\r\n' +
        '\t</ClaimsProvider>\r\n';

    static TP_IDP_ADFS: string = '\t<ClaimsProvider>\r\n' +
        '\t    <Domain>contoso.com</Domain>\r\n' +
        '\t    <DisplayName>Contoso ADFS</DisplayName>\r\n' +
        '\t    <TechnicalProfiles>\r\n' +
        '\t    <TechnicalProfile Id="Contoso-SAML2">\r\n' +
        '\t        <DisplayName>Contoso ADFS</DisplayName>\r\n' +
        '\t        <Description>Login with your Contoso account</Description>\r\n' +
        '\t        <Protocol Name="SAML2"/>\r\n' +
        '\t        <Metadata>\r\n' +
        '\t        <Item Key="RequestsSigned">false</Item>\r\n' +
        '\t        <Item Key="WantsEncryptedAssertions">false</Item>\r\n' +
        '\t        <Item Key="PartnerEntity">https://{your_ADFS_domain}/federationmetadata/2007-06/federationmetadata.xml</Item>\r\n' +
        '\t        </Metadata>\r\n' +
        '\t        <CryptographicKeys>\r\n' +
        '\t        <Key Id="SamlAssertionSigning" StorageReferenceId="B2C_1A_ADFSSamlCert"/>\r\n' +
        '\t        <Key Id="SamlMessageSigning" StorageReferenceId="B2C_1A_ADFSSamlCert"/>\r\n' +
        '\t        </CryptographicKeys>\r\n' +
        '\t        <OutputClaims>\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="socialIdpUserId" PartnerClaimType="userPrincipalName" />\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="givenName" PartnerClaimType="given_name"/>\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="surname" PartnerClaimType="family_name"/>\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="email" PartnerClaimType="email"/>\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="displayName" PartnerClaimType="name"/>\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="identityProvider" DefaultValue="contoso.com" />\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="authenticationSource" DefaultValue="socialIdpAuthentication"/>\r\n' +
        '\t        </OutputClaims>\r\n' +
        '\t        <OutputClaimsTransformations>\r\n' +
        '\t        <OutputClaimsTransformation ReferenceId="CreateRandomUPNUserName"/>\r\n' +
        '\t        <OutputClaimsTransformation ReferenceId="CreateUserPrincipalName"/>\r\n' +
        '\t        <OutputClaimsTransformation ReferenceId="CreateAlternativeSecurityId"/>\r\n' +
        '\t        <OutputClaimsTransformation ReferenceId="CreateSubjectClaimFromAlternativeSecurityId"/>\r\n' +
        '\t        </OutputClaimsTransformations>\r\n' +
        '\t        <UseTechnicalProfileForSessionManagement ReferenceId="SM-Noop"/>\r\n' +
        '\t    </TechnicalProfile>\r\n' +
        '\t    </TechnicalProfiles>\r\n' +
        '\t</ClaimsProvider>\r\n';

    static TP_IDP_Saleforce: string = '\t<ClaimsProvider>\r\n' +
        '\t  <Domain>salesforce</Domain>\r\n' +
        '\t  <DisplayName>Salesforce</DisplayName>\r\n' +
        '\t  <TechnicalProfiles>\r\n' +
        '\t    <TechnicalProfile Id="salesforce">\r\n' +
        '\t      <DisplayName>Salesforce</DisplayName>\r\n' +
        '\t      <Description>Login with your Salesforce account</Description>\r\n' +
        '\t      <Protocol Name="SAML2"/>\r\n' +
        '\t      <Metadata>\r\n' +
        '\t        <Item Key="RequestsSigned">false</Item>\r\n' +
        '\t        <Item Key="WantsEncryptedAssertions">false</Item>\r\n' +
        '\t        <Item Key="WantsSignedAssertions">false</Item>\r\n' +
        '\t        <Item Key="PartnerEntity">https://contoso-dev-ed.my.salesforce.com/.well-known/samlidp.xml</Item>\r\n' +
        '\t      </Metadata>\r\n' +
        '\t      <CryptographicKeys>\r\n' +
        '\t        <Key Id="SamlAssertionSigning" StorageReferenceId="B2C_1A_SAMLSigningCert"/>\r\n' +
        '\t        <Key Id="SamlMessageSigning" StorageReferenceId="B2C_1A_SAMLSigningCert"/>\r\n' +
        '\t      </CryptographicKeys>\r\n' +
        '\t      <OutputClaims>\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="socialIdpUserId" PartnerClaimType="userId"/>\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="givenName" PartnerClaimType="given_name"/>\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="surname" PartnerClaimType="family_name"/>\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="email" PartnerClaimType="email"/>\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="displayName" PartnerClaimType="username"/>\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="authenticationSource" DefaultValue="externalIdp"/>\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="identityProvider" DefaultValue="SAMLIdp" />\r\n' +
        '\t      </OutputClaims>\r\n' +
        '\t      <OutputClaimsTransformations>\r\n' +
        '\t        <OutputClaimsTransformation ReferenceId="CreateRandomUPNUserName"/>\r\n' +
        '\t        <OutputClaimsTransformation ReferenceId="CreateUserPrincipalName"/>\r\n' +
        '\t        <OutputClaimsTransformation ReferenceId="CreateAlternativeSecurityId"/>\r\n' +
        '\t        <OutputClaimsTransformation ReferenceId="CreateSubjectClaimFromAlternativeSecurityId"/>\r\n' +
        '\t      </OutputClaimsTransformations>\r\n' +
        '\t      <UseTechnicalProfileForSessionManagement ReferenceId="SM-Noop"/>\r\n' +
        '\t    </TechnicalProfile>\r\n' +
        '\t  </TechnicalProfiles>\r\n' +
        '\t</ClaimsProvider>\r\n';

    static TP_IDP_Amazon: string = '\t    <ClaimsProvider>\r\n' +
        '\t        <Domain>amazon.com</Domain>\r\n' +
        '\t        <DisplayName>Amazon</DisplayName>\r\n' +
        '\t        <TechnicalProfiles>\r\n' +
        '\t        <TechnicalProfile Id="Amazon-OAUTH">\r\n' +
        '\t            <DisplayName>Amazon</DisplayName>\r\n' +
        '\t            <Protocol Name="OAuth2" />\r\n' +
        '\t            <Metadata>\r\n' +
        '\t            <Item Key="ProviderName">amazon</Item>\r\n' +
        '\t            <Item Key="authorization_endpoint">https://www.amazon.com/ap/oa</Item>\r\n' +
        '\t            <Item Key="AccessTokenEndpoint">https://api.amazon.com/auth/o2/token</Item>\r\n' +
        '\t            <Item Key="ClaimsEndpoint">https://api.amazon.com/user/profile</Item>\r\n' +
        '\t            <Item Key="scope">profile</Item>\r\n' +
        '\t            <Item Key="HttpBinding">POST</Item>\r\n' +
        '\t            <Item Key="UsePolicyInRedirectUri">0</Item>\r\n' +
        '\t            <Item Key="client_id">Your Amazon application client ID</Item>\r\n' +
        '\t            </Metadata>\r\n' +
        '\t            <CryptographicKeys>\r\n' +
        '\t            <Key Id="client_secret" StorageReferenceId="B2C_1A_AmazonSecret" />\r\n' +
        '\t            </CryptographicKeys>\r\n' +
        '\t            <OutputClaims>\r\n' +
        '\t            <OutputClaim ClaimTypeReferenceId="socialIdpUserId" PartnerClaimType="user_id" />\r\n' +
        '\t            <OutputClaim ClaimTypeReferenceId="email" PartnerClaimType="email" />\r\n' +
        '\t            <OutputClaim ClaimTypeReferenceId="displayName" PartnerClaimType="name" />\r\n' +
        '\t            <OutputClaim ClaimTypeReferenceId="identityProvider" DefaultValue="amazon.com" />\r\n' +
        '\t            <OutputClaim ClaimTypeReferenceId="authenticationSource" DefaultValue="socialIdpAuthentication" />\r\n' +
        '\t            </OutputClaims>\r\n' +
        '\t            <OutputClaimsTransformations>\r\n' +
        '\t            <OutputClaimsTransformation ReferenceId="CreateRandomUPNUserName" />\r\n' +
        '\t            <OutputClaimsTransformation ReferenceId="CreateUserPrincipalName" />\r\n' +
        '\t            <OutputClaimsTransformation ReferenceId="CreateAlternativeSecurityId" />\r\n' +
        '\t            <OutputClaimsTransformation ReferenceId="CreateSubjectClaimFromAlternativeSecurityId" />\r\n' +
        '\t            </OutputClaimsTransformations>\r\n' +
        '\t            <UseTechnicalProfileForSessionManagement ReferenceId="SM-SocialLogin" />\r\n' +
        '\t        </TechnicalProfile>\r\n' +
        '\t        </TechnicalProfiles>\r\n' +
        '\t    </ClaimsProvider>\r\n';

    static TP_IDP_VK: string = '\tNot implemented yet\r\n';

    static TP_REST_None: string = '\t<ClaimsProvider>\r\n' +
        '\t    <DisplayName>REST APIs</DisplayName>\r\n' +
        '\t    <TechnicalProfiles>\r\n' +
        '\t\r\n' +
        '\t    <!-- Custom Restful service -->\r\n' +
        '\t    <TechnicalProfile Id="{name}">\r\n' +
        '\t        <DisplayName>Validate user input data and return loyaltyNumber claim</DisplayName>\r\n' +
        '\t        <Protocol Name="Proprietary" Handler="Web.TPEngine.Providers.RestfulProvider, Web.TPEngine, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null" />\r\n' +
        '\t        <Metadata>\r\n' +
        '\t        <Item Key="ServiceUrl">{serviceUri}</Item>\r\n' +
        '\t        <Item Key="AuthenticationType">None</Item>\r\n' +
        '\t        <Item Key="SendClaimsIn">Body</Item>\r\n' +
        '\t        </Metadata>\r\n' +
        '\t        <InputClaims>\r\n' +
        '\t        <InputClaim ClaimTypeReferenceId="email" />\r\n' +
        '\t        <InputClaim ClaimTypeReferenceId="givenName" PartnerClaimType="firstName" />\r\n' +
        '\t        <InputClaim ClaimTypeReferenceId="surname" PartnerClaimType="lastName" />\r\n' +
        '\t        </InputClaims>\r\n' +
        '\t        <OutputClaims>\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="loyaltyNumber" PartnerClaimType="loyaltyNumber" />\r\n' +
        '\t        </OutputClaims>\r\n' +
        '\t        <UseTechnicalProfileForSessionManagement ReferenceId="SM-Noop" />\r\n' +
        '\t    </TechnicalProfile>\r\n' +
        '\r\n' +
        '\t    </TechnicalProfiles>\r\n' +
        '\t</ClaimsProvider>\r\n';

    static TP_REST_Basic: string = '\t<ClaimsProvider>\r\n' +
        '\t    <DisplayName>REST APIs</DisplayName>\r\n' +
        '\t    <TechnicalProfiles>\r\n' +
        '\t\r\n' +
        '\t    <!-- Custom Restful service -->\r\n' +
        '\t    <TechnicalProfile Id="{name}">\r\n' +
        '\t        <DisplayName>Validate user input data and return loyaltyNumber claim</DisplayName>\r\n' +
        '\t        <Protocol Name="Proprietary" Handler="Web.TPEngine.Providers.RestfulProvider, Web.TPEngine, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null" />\r\n' +
        '\t        <Metadata>\r\n' +
        '\t        <Item Key="ServiceUrl">{serviceUri}</Item>\r\n' +
        '\t        <Item Key="AuthenticationType">None</Item>\r\n' +
        '\t        <Item Key="SendClaimsIn">Basic</Item>\r\n' +
        '\t        </Metadata>\r\n' +
        '\t        <CryptographicKeys>\r\n' +
        '\t             <Key Id="BasicAuthenticationUsername" StorageReferenceId="B2C_1A_B2cRestClientId" />\r\n' +
        '\t             <Key Id="BasicAuthenticationPassword" StorageReferenceId="B2C_1A_B2cRestClientSecret" />\r\n' +
        '\t        </CryptographicKeys>\r\n' +
        '\t        <InputClaims>\r\n' +
        '\t        <InputClaim ClaimTypeReferenceId="email" />\r\n' +
        '\t        <InputClaim ClaimTypeReferenceId="givenName" PartnerClaimType="firstName" />\r\n' +
        '\t        <InputClaim ClaimTypeReferenceId="surname" PartnerClaimType="lastName" />\r\n' +
        '\t        </InputClaims>\r\n' +
        '\t        <OutputClaims>\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="loyaltyNumber" PartnerClaimType="loyaltyNumber" />\r\n' +
        '\t        </OutputClaims>\r\n' +
        '\t        <UseTechnicalProfileForSessionManagement ReferenceId="SM-Noop" />\r\n' +
        '\t    </TechnicalProfile>\r\n' +
        '\r\n' +
        '\t    </TechnicalProfiles>\r\n' +
        '\t</ClaimsProvider>\r\n';

    static TP_REST_ClientCertificate: string = '\t<ClaimsProvider>\r\n' +
        '\t    <DisplayName>REST APIs</DisplayName>\r\n' +
        '\t    <TechnicalProfiles>\r\n' +
        '\t\r\n' +
        '\t    <!-- Custom Restful service -->\r\n' +
        '\t    <TechnicalProfile Id="{name}">\r\n' +
        '\t        <DisplayName>Validate user input data and return loyaltyNumber claim</DisplayName>\r\n' +
        '\t        <Protocol Name="Proprietary" Handler="Web.TPEngine.Providers.RestfulProvider, Web.TPEngine, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null" />\r\n' +
        '\t        <Metadata>\r\n' +
        '\t        <Item Key="ServiceUrl">{serviceUri}</Item>\r\n' +
        '\t        <Item Key="AuthenticationType">None</Item>\r\n' +
        '\t        <Item Key="SendClaimsIn">ClientCertificate</Item>\r\n' +
        '\t        </Metadata>\r\n' +
        '\t        <CryptographicKeys>\r\n' +
        '\t             <Key Id="ClientCertificate" StorageReferenceId="B2C_1A_B2cRestClientCertificate" />\r\n' +
        '\t        </CryptographicKeys>\r\n' +
        '\t        <InputClaims>\r\n' +
        '\t        <InputClaim ClaimTypeReferenceId="email" />\r\n' +
        '\t        <InputClaim ClaimTypeReferenceId="givenName" PartnerClaimType="firstName" />\r\n' +
        '\t        <InputClaim ClaimTypeReferenceId="surname" PartnerClaimType="lastName" />\r\n' +
        '\t        </InputClaims>\r\n' +
        '\t        <OutputClaims>\r\n' +
        '\t        <OutputClaim ClaimTypeReferenceId="loyaltyNumber" PartnerClaimType="loyaltyNumber" />\r\n' +
        '\t        </OutputClaims>\r\n' +
        '\t        <UseTechnicalProfileForSessionManagement ReferenceId="SM-Noop" />\r\n' +
        '\t    </TechnicalProfile>\r\n' +
        '\r\n' +
        '\t    </TechnicalProfiles>\r\n' +
        '\t</ClaimsProvider>\r\n';

    static CLAIM_TextBox: string = '\t<ClaimType Id="{name}">\r\n' +
        '\t  <DisplayName>{displayName}</DisplayName>\r\n' +
        '\t  <DataType>string</DataType>\r\n' +
        '\t  <UserHelpText>{displayName}</UserHelpText>\r\n' +
        '\t  <UserInputType>TextBox</UserInputType>\r\n' +
        '\t</ClaimType>\r\n';

    static CLAIM_RadioSingleSelect: string = '\t<ClaimType Id="{name}">\r\n' +
        '\t	<DisplayName>{displayName}</DisplayName>\r\n' +
        '\t	<DataType>string</DataType>\r\n' +
        '\t	<UserInputType>RadioSingleSelect</UserInputType>\r\n' +
        '\t	<Restriction>\r\n' +
        '\t		<Enumeration Text="Bellevue" Value="bellevue" SelectByDefault="false" />\r\n' +
        '\t		<Enumeration Text="Redmond" Value="redmond" SelectByDefault="false" />\r\n' +
        '\t		<Enumeration Text="Kirkland" Value="kirkland" SelectByDefault="false" />\r\n' +
        '\t	</Restriction>\r\n' +
        '\t</ClaimType>\r\n';

    static CLAIM_DropdownSingleSelect: string = '\t<ClaimType Id="{name}">\r\n' +
        '\t  <DisplayName>{displayName}</DisplayName>\r\n' +
        '\t  <DataType>string</DataType>\r\n' +
        '\t  <UserInputType>DropdownSingleSelect</UserInputType>\r\n' +
        '\t  <Restriction>\r\n' +
        '\t    <Enumeration Text="Bellevue" Value="bellevue" SelectByDefault="false" />\r\n' +
        '\t    <Enumeration Text="Redmond" Value="redmond" SelectByDefault="false" />\r\n' +
        '\t    <Enumeration Text="Kirkland" Value="kirkland" SelectByDefault="false" />\r\n' +
        '\t  </Restriction>\r\n' +
        '\t</ClaimType>\r\n';

    static CLAIM_CheckboxMultiSelect: string = '\t<ClaimType Id="{name}">\r\n' +
        '\t  <DisplayName>{displayName}</DisplayName>\r\n' +
        '\t  <DataType>string</DataType>\r\n' +
        '\t  <UserInputType>CheckboxMultiSelect</UserInputType>\r\n' +
        '\t  <Restriction>\r\n' +
        '\t    <Enumeration Text="Bellevue" Value="bellevue" SelectByDefault="false" />\r\n' +
        '\t    <Enumeration Text="Redmond" Value="redmond" SelectByDefault="false" />\r\n' +
        '\t    <Enumeration Text="Kirkland" Value="kirkland" SelectByDefault="false" />\r\n' +
        '\t  </Restriction>\r\n' +
        '\t</ClaimType>\r\n';

    static CLAIM_DateTimeDropdown: string = '\t<!--Note: Internal use only. Do not persist this claim to Azure AD directory -->\r\n' +
        '\t<ClaimType Id="{name}">\r\n' +
        '\t <DisplayName>{displayName}</DisplayName>\r\n' +
        '\t <DataType>date</DataType>\r\n' +
        '\t <UserInputType>DateTimeDropdown</UserInputType>\r\n' +
        '\t</ClaimType>\r\n';

    static CLAIM_Readonly: string = '\t<ClaimType Id="{name}">\r\n' +
        '\t	<DisplayName>{displayName}</DisplayName>\r\n' +
        '\t	<DataType>string</DataType>\r\n' +
        '\t	<UserInputType>Readonly</UserInputType>\r\n' +
        '\t</ClaimType>\r\n';

    static CLAIM_Paragraph: string = '\t<ClaimType Id="{name}">\r\n' +
        '\t	<DisplayName>{displayName}</DisplayName>\r\n' +
        '\t	<DataType>string</DataType>\r\n' +
        '\t	<UserInputType>Paragraph</UserInputType>\r\n' +
        '\t</ClaimType>\r\n';

    static ApplicationInsightsDebugMode: string = '\t<!--Step 1: Add the following attributes to the <TrustFrameworkPolicy> element\r\n' +
        '\tDeploymentMode="Development"\r\n' +
        '\tUserJourneyRecorderEndpoint="urn:journeyrecorder:applicationinsights"\r\n' +
        '\t-->\r\n' +
        '\r\n' +
        '\t<!--Step 2: Add the following node immediately after the DefaultUserJourney element-->\r\n' +
        '\t<UserJourneyBehaviors>\r\n' +
        '\t	<JourneyInsights TelemetryEngine="ApplicationInsights" InstrumentationKey="{instrumentationKey}" DeveloperMode="true" ClientEnabled="false" ServerEnabled="true" TelemetryVersion="1.0.0" />\r\n' +
        '\t</UserJourneyBehaviors>\r\n';

        static CLAIM_stringCollection: string = '\t<ClaimType Id="{name}">\r\n' +
        '\t	<DisplayName>{displayName}</DisplayName>\r\n' +
        '\t	<DataType>stringCollection</DataType>\r\n' +
        '\t	<AdminHelpText>Add help text here</AdminHelpText>\r\n' +
        '\t	<UserHelpText>Add help text here</UserHelpText>\r\n' +
        '\t</ClaimType>\r\n';


        static CLAIM_Boolean: string = '\t<ClaimType Id="{name}">\r\n' +
        '\t	<DisplayName>{displayName}</DisplayName>\r\n' +
        '\t	<DataType>boolean</DataType>\r\n' +
        '\t	<AdminHelpText>Add help text here</AdminHelpText>\r\n' +
        '\t	<UserHelpText>Add help text here</UserHelpText>\r\n' +
        '\t</ClaimType>\r\n';


        static CLAIM_Integer: string = '\t<ClaimType Id="{name}">\r\n' +
        '\t	<DisplayName>{displayName}</DisplayName>\r\n' +
        '\t	<DataType>int</DataType>\r\n' +
        '\t	<AdminHelpText>Add help text here</AdminHelpText>\r\n' +
        '\t	<UserHelpText>Add help text here</UserHelpText>\r\n' +
        '\t</ClaimType>\r\n';
}



