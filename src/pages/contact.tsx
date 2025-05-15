"use client"

import { Card, CardContent } from "@mui/joy";
import { LuGithub, LuLinkedin, LuMail, LuMapPin, LuPhone } from "react-icons/lu";

export default function ContactPage() {
 

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Contact Me</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
          <p className="text-muted-foreground mb-8">
            I'm always open to discussing new projects, research opportunities, or potential collaborations. Feel free
            to reach out using the contact form or through any of the channels listed below.
          </p>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <LuMail size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-muted-foreground">contact@anniebhalla.com</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <LuPhone size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-muted-foreground">+49 123 456 7890</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <LuMapPin size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-muted-foreground">Stuttgart, Germany</p>
                </div>
              </CardContent>
            </Card>

            <h3 className="font-semibold text-xl mt-8 mb-4">Connect with me</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="https://github.com/anniebhalla" target="_blank" rel="noopener noreferrer">
                <Card className="hover:bg-muted/50 transition-colors">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                      <LuGithub size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold">GitHub</h3>
                      <p className="text-muted-foreground text-sm">@anniebhalla</p>
                    </div>
                  </CardContent>
                </Card>
              </a>

              <a href="https://linkedin.com/in/anniebhalla" target="_blank" rel="noopener noreferrer">
                <Card className="hover:bg-muted/50 transition-colors">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                      <LuLinkedin size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold">LinkedIn</h3>
                      <p className="text-muted-foreground text-sm">@anniebhalla</p>
                    </div>
                  </CardContent>
                </Card>
              </a>

            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
{/* TODO: send a message form */}
        </div>
      </div>
    </div>
  )
}
