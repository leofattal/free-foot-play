// Email Templates for Free Foot Play
// These templates can be used with Resend, SendGrid, or any email service

interface MatchDetails {
  parentName: string;
  childName: string;
  matchDate: string;
  matchTime: string;
  ageGroup: string;
  fieldLocation: string;
}

// Base email wrapper with consistent styling
function emailWrapper(content: string, title: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          .header {
            background: linear-gradient(135deg, #2E7D32 0%, #43A047 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
          }
          .content {
            padding: 30px 20px;
          }
          .match-card {
            background-color: #f9f9f9;
            border-left: 4px solid #2E7D32;
            padding: 20px;
            margin: 20px 0;
            border-radius: 4px;
          }
          .match-card h3 {
            margin-top: 0;
            color: #2E7D32;
          }
          .match-card p {
            margin: 8px 0;
          }
          .button {
            display: inline-block;
            background-color: #FF9800;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 20px 0;
          }
          .button:hover {
            background-color: #F57C00;
          }
          .info-box {
            background-color: #E3F2FD;
            border-left: 4px solid #1976D2;
            padding: 15px;
            margin: 20px 0;
          }
          .warning-box {
            background-color: #FFF3E0;
            border-left: 4px solid #FF9800;
            padding: 15px;
            margin: 20px 0;
          }
          .footer {
            background-color: #f5f5f5;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #666;
          }
          .footer a {
            color: #1976D2;
            text-decoration: none;
          }
          ul {
            padding-left: 20px;
          }
          ul li {
            margin: 8px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          ${content}
          <div class="footer">
            <p><strong>Free Foot Play</strong> - Youth Soccer Registration</p>
            <p>
              <a href="https://freefootplay.com/dashboard">Dashboard</a> •
              <a href="https://freefootplay.com/field-info">Field Info</a> •
              <a href="https://freefootplay.com/contact">Contact Us</a>
            </p>
            <p style="font-size: 12px; color: #999;">
              You received this email because you registered with Free Foot Play.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

// 1. Match Reminder (24 hours before)
export function matchReminderEmail(data: MatchDetails): string {
  const content = `
    <div class="header">
      <h1>⚽ Match Reminder</h1>
    </div>
    <div class="content">
      <p>Hi ${data.parentName},</p>
      <p>This is a friendly reminder that <strong>${data.childName}</strong> has a soccer match tomorrow!</p>

      <div class="match-card">
        <h3>Match Details</h3>
        <p><strong>📅 Date:</strong> ${data.matchDate}</p>
        <p><strong>🕐 Time:</strong> ${data.matchTime}</p>
        <p><strong>👶 Age Group:</strong> ${data.ageGroup}</p>
        <p><strong>📍 Location:</strong> ${data.fieldLocation}</p>
      </div>

      <div class="info-box">
        <p><strong>Important Reminders:</strong></p>
        <ul>
          <li>Arrive <strong>15 minutes early</strong> for warm-up</li>
          <li>Bring water, shin guards, and appropriate footwear</li>
          <li>Check weather conditions before leaving</li>
          <li>Sunscreen recommended for outdoor play</li>
        </ul>
      </div>

      <p style="text-align: center;">
        <a href="https://freefootplay.com/dashboard" class="button">View Dashboard</a>
      </p>

      <p>See you on the field!</p>
      <p>The Free Foot Play Team</p>
    </div>
  `;

  return emailWrapper(content, 'Match Reminder - Tomorrow!');
}

// 2. Registration Confirmation
export function registrationConfirmationEmail(data: MatchDetails): string {
  const content = `
    <div class="header">
      <h1>✅ Registration Confirmed!</h1>
    </div>
    <div class="content">
      <p>Hi ${data.parentName},</p>
      <p>Great news! <strong>${data.childName}</strong> has been successfully registered for an upcoming match.</p>

      <div class="match-card">
        <h3>Match Details</h3>
        <p><strong>📅 Date:</strong> ${data.matchDate}</p>
        <p><strong>🕐 Time:</strong> ${data.matchTime}</p>
        <p><strong>👶 Age Group:</strong> ${data.ageGroup}</p>
        <p><strong>📍 Location:</strong> ${data.fieldLocation}</p>
      </div>

      <p><strong>What's Next?</strong></p>
      <ul>
        <li>We'll send you a reminder 24 hours before the match</li>
        <li>You can view or cancel your registration in your dashboard</li>
        <li>Check the field info page for directions and parking</li>
      </ul>

      <p style="text-align: center;">
        <a href="https://freefootplay.com/dashboard" class="button">View Dashboard</a>
      </p>

      <p>Looking forward to seeing ${data.childName} on the field!</p>
      <p>The Free Foot Play Team</p>
    </div>
  `;

  return emailWrapper(content, 'Registration Confirmed!');
}

// 3. Match Cancellation
export function matchCancellationEmail(
  data: MatchDetails & { reason?: string }
): string {
  const content = `
    <div class="header">
      <h1>⚠️ Match Cancelled</h1>
    </div>
    <div class="content">
      <p>Hi ${data.parentName},</p>
      <p>We regret to inform you that the match scheduled for <strong>${data.childName}</strong> has been cancelled.</p>

      <div class="match-card">
        <h3>Cancelled Match Details</h3>
        <p><strong>📅 Date:</strong> ${data.matchDate}</p>
        <p><strong>🕐 Time:</strong> ${data.matchTime}</p>
        <p><strong>👶 Age Group:</strong> ${data.ageGroup}</p>
        <p><strong>📍 Location:</strong> ${data.fieldLocation}</p>
      </div>

      ${
        data.reason
          ? `
      <div class="warning-box">
        <p><strong>Reason:</strong> ${data.reason}</p>
      </div>
      `
          : ''
      }

      <p>We apologize for any inconvenience this may cause. We'll notify you if the match is rescheduled.</p>
      <p>You can browse other available matches in your dashboard.</p>

      <p style="text-align: center;">
        <a href="https://freefootplay.com/matches" class="button">Browse Matches</a>
      </p>

      <p>Thank you for your understanding.</p>
      <p>The Free Foot Play Team</p>
    </div>
  `;

  return emailWrapper(content, 'Match Cancelled');
}

// 4. Waitlist Spot Available
export function waitlistAvailableEmail(
  data: Omit<MatchDetails, 'childName'> & { matchId: string }
): string {
  const content = `
    <div class="header">
      <h1>🎉 A Spot Opened Up!</h1>
    </div>
    <div class="content">
      <p>Hi ${data.parentName},</p>
      <p>Good news! A spot has opened up for the match you were waiting for.</p>

      <div class="match-card">
        <h3>Available Match</h3>
        <p><strong>📅 Date:</strong> ${data.matchDate}</p>
        <p><strong>🕐 Time:</strong> ${data.matchTime}</p>
        <p><strong>👶 Age Group:</strong> ${data.ageGroup}</p>
        <p><strong>📍 Location:</strong> ${data.fieldLocation}</p>
      </div>

      <div class="warning-box">
        <p><strong>⚡ Act fast!</strong> Spots fill up quickly. Register now to secure your child's place.</p>
      </div>

      <p style="text-align: center;">
        <a href="https://freefootplay.com/matches/${data.matchId}" class="button">Register Now</a>
      </p>

      <p>See you on the field!</p>
      <p>The Free Foot Play Team</p>
    </div>
  `;

  return emailWrapper(content, 'Spot Available!');
}

// 5. Welcome Email (After First Signup)
export function welcomeEmail(data: { parentName: string; email: string }): string {
  const content = `
    <div class="header">
      <h1>⚽ Welcome to Free Foot Play!</h1>
    </div>
    <div class="content">
      <p>Hi ${data.parentName},</p>
      <p>Welcome to Free Foot Play! We're excited to have you join our community of soccer-loving families.</p>

      <p><strong>Here's how to get started:</strong></p>
      <ol>
        <li><strong>Add Your Children</strong> - Add your kids' profiles with their age groups</li>
        <li><strong>Browse Matches</strong> - Check out our upcoming match schedule</li>
        <li><strong>Register</strong> - Sign up your kids for matches that fit your schedule</li>
        <li><strong>Get Reminders</strong> - We'll email you 24 hours before each match</li>
      </ol>

      <div class="info-box">
        <p><strong>Quick Links:</strong></p>
        <ul>
          <li><a href="https://freefootplay.com/dashboard">Dashboard</a> - Manage your account</li>
          <li><a href="https://freefootplay.com/matches">Match Schedule</a> - Browse upcoming games</li>
          <li><a href="https://freefootplay.com/field-info">Field Information</a> - Directions and parking</li>
          <li><a href="https://freefootplay.com/contact">Contact Us</a> - Questions? We're here to help!</li>
        </ul>
      </div>

      <p style="text-align: center;">
        <a href="https://freefootplay.com/dashboard/children/add" class="button">Add Your First Child</a>
      </p>

      <p>Let's get your kids playing!</p>
      <p>The Free Foot Play Team</p>
    </div>
  `;

  return emailWrapper(content, 'Welcome to Free Foot Play!');
}

// 6. Registration Cancellation Confirmation
export function cancellationConfirmationEmail(data: MatchDetails): string {
  const content = `
    <div class="header">
      <h1>Registration Cancelled</h1>
    </div>
    <div class="content">
      <p>Hi ${data.parentName},</p>
      <p>This confirms that <strong>${data.childName}'s</strong> registration has been cancelled for the following match:</p>

      <div class="match-card">
        <h3>Cancelled Registration</h3>
        <p><strong>📅 Date:</strong> ${data.matchDate}</p>
        <p><strong>🕐 Time:</strong> ${data.matchTime}</p>
        <p><strong>👶 Age Group:</strong> ${data.ageGroup}</p>
        <p><strong>📍 Location:</strong> ${data.fieldLocation}</p>
      </div>

      <p>You can browse other available matches or re-register if you change your mind.</p>

      <p style="text-align: center;">
        <a href="https://freefootplay.com/matches" class="button">Browse Matches</a>
      </p>

      <p>The Free Foot Play Team</p>
    </div>
  `;

  return emailWrapper(content, 'Registration Cancelled');
}
